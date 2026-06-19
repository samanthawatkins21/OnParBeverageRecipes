import { NextResponse } from "next/server";

function parseJsonLoose(text) {
  try {
    return JSON.parse(text);
  } catch {
    const safe = [];
    let inString = false;
    let escaping = false;
    for (const char of String(text || "")) {
      if (!inString) {
        if (char === '"') inString = true;
        safe.push(char);
        continue;
      }
      if (escaping) {
        safe.push(char);
        escaping = false;
        continue;
      }
      if (char === "\\") {
        safe.push(char);
        escaping = true;
        continue;
      }
      if (char === '"') {
        safe.push(char);
        inString = false;
        continue;
      }
      if (char === "\n") {
        safe.push("\\n");
        continue;
      }
      if (char === "\r") {
        safe.push("\\r");
        continue;
      }
      safe.push(char);
    }

    try {
      return JSON.parse(safe.join(""));
    } catch {
      return null;
    }
  }
}

async function postJson(baseUrl, path, body, token = "") {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const raw = await response.text();
  return {
    status: response.status,
    json: parseJsonLoose(raw),
    raw,
  };
}

function getConfig() {
  const baseUrl = (process.env.PMB_API_BASE_URL || "").trim().replace(/\/$/, "");
  if (!baseUrl) {
    throw new Error("Missing PMB_API_BASE_URL in .env.local");
  }

  return {
    baseUrl,
    username: (process.env.PMB_API_USERNAME || "admin").trim(),
    password: (process.env.PMB_API_PASSWORD || "admin").trim(),
    clientId: Number(process.env.PMB_API_CLIENT_ID || "910423"),
    clientName: (process.env.PMB_API_CLIENT_NAME || "PourMyBeer API").trim(),
  };
}

async function getAuthtoken(config) {
  const auth = await postJson(config.baseUrl, "/api/authtoken", {
    username: config.username,
    password: config.password,
    id: config.clientId,
    name: config.clientName,
    type: "json-server-control",
    version: 1,
  });

  if (auth.status !== 200 || !auth.json?.authtoken) {
    throw new Error(`PMB authtoken failed (${auth.status})`);
  }

  return String(auth.json.authtoken);
}

function normalizeProductName(name) {
  return String(name || "")
    .replace(/’/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getChargePerOz(product) {
  const cents = Number(product.price_per_unit);
  if (!Number.isFinite(cents) || cents <= 0) return 0;
  return cents / 100;
}

export async function GET() {
  try {
    const config = getConfig();
    const token = await getAuthtoken(config);
    const products = await postJson(config.baseUrl, "/api/productlist", { id: String(config.clientId) }, token);

    if (products.status !== 200 || !Array.isArray(products.json?.productlist)) {
      throw new Error(`PMB productlist failed (${products.status})`);
    }

    const items = products.json.productlist
      .map((product, index) => {
        const chargePerOz = getChargePerOz(product);
        const name = normalizeProductName(product.name);
        if (!name || !chargePerOz || /coming soon/i.test(name)) return null;

        return {
          tapPosition: index + 1,
          plu: Number(product.plu || 0) || null,
          name,
          chargePerOz,
          pricePerUnitCents: Number(product.price_per_unit || 0),
          happyHour1PerOz: Number(product.price_per_unit_happyhour1 || 0) / 100 || null,
          happyHour2PerOz: Number(product.price_per_unit_happyhour2 || 0) / 100 || null,
          volumeUnit: String(product.volume_unit || ""),
          isActive: Number(product.is_active || 0) === 1,
          isInUse: Number(product.is_in_use || 0) === 1,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      items,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not load tap pricing." },
      { status: 500 },
    );
  }
}
