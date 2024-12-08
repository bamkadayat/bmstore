import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decodedToken = jwtDecode<JwtPayload & { id: string; email: string; role: string }>(authToken);

    if (request.nextUrl.pathname.startsWith("/admin") && decodedToken.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token decoding failed:", error);

    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"], 
};
