import { NextResponse } from "next/server";

const COOKIE_NAME = "onpar_dashboard_session";

async function signPassword(password) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode("onpar-dashboard-login"));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request) {
  const expectedPassword = process.env.DASHBOARD_PASSWORD;
  if (!expectedPassword) {
    return NextResponse.json(
      { error: "DASHBOARD_PASSWORD is not configured." },
      { status: 500 },
    );
  }

  let submittedPassword = "";
  try {
    const body = await request.json();
    submittedPassword = String(body?.password || "");
  } catch {
    submittedPassword = "";
  }

  if (submittedPassword !== expectedPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: COOKIE_NAME,
    value: await signPassword(expectedPassword),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
