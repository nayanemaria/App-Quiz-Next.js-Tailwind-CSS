import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "@/router/routes";
import Cookies from 'js-cookie';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`/auth/login?event=${request.nextUrl.searchParams.get('event')}`, request.url))
  }
  const currentPerson = request.cookies.get("currentPerson")?.value;
  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentPerson || Date.now() > JSON.parse(currentPerson).expiredAt)
  ) {
    Cookies.remove("currentPerson");
    const response = NextResponse.redirect(new URL(`/auth/login?event=${request.nextUrl.searchParams.get('event')}`, request.url));
    Cookies.remove("currentPerson");
    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentPerson) {
    return NextResponse.redirect(new URL(`/main?event=${request.nextUrl.searchParams.get('event')}`, request.url));
  }
}
