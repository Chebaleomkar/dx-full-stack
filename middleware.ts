import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode('dxAlpha@DisciplineX!');

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse('Access Denied', { status: 403 });
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const { payload }:any = await jwtVerify(token, secret);
    req.headers.set('x-user-role', payload.role);

    return NextResponse.next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return new NextResponse('Invalid Token', { status: 403 });
  }
}

export const config = {
  matcher: [
    '/api/:path((?!student/login|user/login).*)',  
  ],
};
