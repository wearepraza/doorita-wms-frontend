import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'; // Remove 'type'

export function middleware(request) {
  const authToken = request.cookies.get('authToken');
  
  if (!authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
