import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const scope = body?.scope || "all";
    const items = Array.isArray(body?.items) ? body.items : [];
    const vendorNames = [...new Set(items.map((item) => item?.vendorProduct?.vendor).filter(Boolean))]
      .filter((vendor) => scope === "all" || vendor === scope);

    const vendorStatuses = [];
    const updates = [];

    for (const vendorName of vendorNames) {
      const vendorItems = items.filter((item) => item?.vendorProduct?.vendor === vendorName);

      if (vendorName === "Proof") {
        vendorStatuses.push({
          vendor: "Proof",
          status: "pending",
          message: "Proof needs a documented API or a supported authenticated sync path before automatic updates can run.",
        });
        continue;
      }

      if (vendorName === "OHLQ") {
        const ohlqResult = await syncOhlqPrices(vendorItems);
        vendorStatuses.push(ohlqResult.status);
        updates.push(...ohlqResult.updates);
        continue;
      }

      vendorStatuses.push({
        vendor: vendorName,
        status: "pending",
        message: "No sync adapter is configured for this vendor yet.",
      });
    }

    return NextResponse.json({
      updates,
      vendorStatuses,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || "Unable to run vendor sync.",
      },
      {
        status: 500,
      },
    );
  }
}

async function syncOhlqPrices(items) {
  const updates = [];

  for (const item of items) {
    const product = item?.vendorProduct;
    if (!product) continue;

    try {
      const response = await fetch(buildOhlqSearchUrl(product.productName), {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept-Language": "en-US,en;q=0.9",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        return {
          updates,
          status: {
            vendor: "OHLQ",
            status: "blocked",
            message: "OHLQ blocked automated price requests from the app server, so the one-click sync cannot complete yet.",
          },
        };
      }

      const html = await response.text();
      if (html.includes("Just a moment") || html.includes("Enable JavaScript and cookies to continue")) {
        return {
          updates,
          status: {
            vendor: "OHLQ",
            status: "blocked",
            message: "OHLQ is protected by Cloudflare, so public server-side scraping is being blocked right now.",
          },
        };
      }
    } catch {
      return {
        updates,
        status: {
          vendor: "OHLQ",
          status: "blocked",
          message: "OHLQ requests are failing from the app server right now, so automatic sync is not available yet.",
        },
      };
    }
  }

  return {
    updates,
    status: {
      vendor: "OHLQ",
      status: "blocked",
      message: "OHLQ mapping is ready, but automatic pricing still needs an approved API or another supported data source.",
    },
  };
}

function buildOhlqSearchUrl(productName) {
  const query = encodeURIComponent(productName);
  return `https://www.ohlq.com/search-results?q=${query}`;
}
