import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublicPath = path == "/signin" || path == "/signup" || path == "/verifyemail" || path == "/processVerifyEmail";

  const token = req.cookies.get('token')?.value || "";

//   if(isPublicPath && token) {
//     return NextResponse.redirect(new URL( path, req.url));
//   }

  if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

}

export const config = {
    matcher : [
        '/',
        '/signin',
        '/signup',
        '/verifyemail',
        '/processVerifyEmail',
        '/dashboard/:path*',
    ]
}