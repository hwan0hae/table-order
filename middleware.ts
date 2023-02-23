// export { default } from "next-auth/middleware";
import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // 로그인 했을 경우에만 존재함 ( "next-auth.session-token" 쿠키가 존재할 때 )
  // raw - 원시 토큰 가져오기 > true시 디코딩 되지않음 default: false
  const token = await getToken({ req, secret, raw: false });

  const { pathname } = req.nextUrl;
  //로그인후 - 로그인,회원가입 접근 제한
  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  //비로그인시 - 정보 접근 제한
  if (
    pathname.startsWith("/menu") ||
    pathname.startsWith("/coupon") ||
    pathname.startsWith("/notify")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
  //비로그인시 or 권한 없는 사용자 - 회원관리 접근 제한
  if (pathname.startsWith("/users")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    if (token.auth !== "OWNER") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/menu", "/coupon", "/notify", "/users", "/signin", "/signup"],
};
