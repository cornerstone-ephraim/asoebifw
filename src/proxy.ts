import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="AEFW Internal", charset="UTF-8"',
    },
  });
}

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();

  const expectedUser = process.env.INTERNAL_DOCS_USER;
  const expectedPassword = process.env.INTERNAL_DOCS_PASSWORD;
  if (!expectedUser || !expectedPassword) return unauthorized();

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) return unauthorized();

  try {
    const [user, password] = atob(authorization.slice(6)).split(":", 2);
    if (user !== expectedUser || password !== expectedPassword) {
      return unauthorized();
    }
  } catch {
    return unauthorized();
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/internal/:path*"] };
