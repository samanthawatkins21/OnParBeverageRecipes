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

async function hasValidSession(request) {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) return false;

  const session = request.cookies.get(COOKIE_NAME)?.value;
  if (!session) return false;

  return session === await signPassword(password);
}

function isPublicPath(pathname) {
  return pathname === "/login" || pathname === "/api/login";
}

function isApiPath(pathname) {
  return pathname.startsWith("/api/");
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuthed = await hasValidSession(request);

  if (isPublicPath(pathname)) {
    if (isAuthed && pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (isAuthed) {
    return NextResponse.next();
  }

  if (isApiPath(pathname)) {
    return NextResponse.json({ error: "Login required." }, { status: 401 });
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
  if (!process.env.DASHBOARD_PASSWORD) {
    loginUrl.searchParams.set("setup", "missing-password");
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)",
  ],
};
