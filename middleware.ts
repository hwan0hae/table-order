import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // 로그인 했을 경우에만 존재함 ( "next-auth.session-token" 쿠키가 존재할 때 )
  // raw - 원시 토큰 가져오기 > true시 디코딩 되지않음 default: false
  const token = await getToken({ req, secret, raw: false });

  const { pathname } = req.nextUrl;
  if (token) {
    //로그인후 - 로그인,회원가입 접근 제한
    if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // 권한 없는 사용자 - 회원관리 접근 제한
    if (pathname.includes("/users")) {
      if (token.auth === "OWNER") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    if (pathname.includes("/add")) {
      if (token.auth === "OWNER" || token.auth === "ADMIN") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return NextResponse.next();
  } else {
    //비로그인시 - 접근 제한
    if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/menu/:path*",
    "/coupon",
    "/notify",
    "/users/:path*",
    "/signin",
    "/signup",
  ],
};

//url path을 admin, owner 이런식으로해서 나누는것도 //ㅇㅇ
