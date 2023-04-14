import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';
import { verify } from 'utill/utill';

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;

  try {
    if (token && refreshToken) {
      /** 토큰 만료 검증 */
      const refreshResponse = await verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );

      if (refreshResponse?.name === 'JWTExpired') {
        const accessResponse = await verify(
          token,
          process.env.JWT_ACCESS_SECRET
        );
        if (accessResponse?.name === 'JWTExpired') {
          const response = new NextResponse();
          response.cookies.delete('access_token');
          response.cookies.delete('refresh_token');
          NextResponse.redirect(new URL('/signin', req.url));
          return response;
        }
      }
      //로그인후 - 로그인,회원가입 접근 제한
      if (pathname.startsWith('/signin') || pathname.startsWith('/signup')) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      // 권한 없는 사용자 - 회원관리 접근 제한
      if (pathname.includes('/member')) {
        if (refreshResponse.auth === 'OWNER') {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL('/', req.url));
        }
      }
      if (pathname.includes('/add')) {
        if (
          refreshResponse.auth === 'OWNER' ||
          refreshResponse.auth === 'ADMIN'
        ) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL('/', req.url));
        }
      }
      return NextResponse.next();
    } else {
      //비로그인시 - 접근 제한
      if (pathname.startsWith('/signin') || pathname.startsWith('/signup')) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/signin', req.url));
      }
    }
  } catch (error) {
    console.log('next middleware >>> ', error);
    NextResponse.json({ error, message: '에러에러' });
  }
}

export const config = {
  matcher: [
    '/menu/:path*',
    '/coupon',
    '/order',
    '/member/:path*',
    '/signin',
    '/signup',
    '/management/:path*',
    '/sales',
  ],
};
