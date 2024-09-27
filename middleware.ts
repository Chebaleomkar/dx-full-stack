import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY!;
if (!secret_key) {
  throw new Error("SECRET_KEY is not defined in environment variables.");
}
const secret = new TextEncoder().encode(secret_key);

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
