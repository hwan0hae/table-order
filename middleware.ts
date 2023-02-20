// export { default } from "next-auth/middleware";
import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // 로그인 했을 경우에만 존재함 ( "next-auth.session-token" 쿠키가 존재할 때 )
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;
  //로그인/회원가입 접근 제한
  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (
    pathname.startsWith("/menu") ||
    pathname.startsWith("/coupon") ||
    pathname.startsWith("/notify")
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
}

export const config = {
  matcher: ["/menu", "/coupon", "/notify", "/signin", "/signup"],
};
