import { NextRequest, NextResponse } from 'next/server';

export const roleMiddleware = (requiredRoles: string[]) => {
  return async (req: NextRequest) => {
    const userRole = req.headers.get('x-user-role');
    
    if (!userRole || !requiredRoles.includes(userRole)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
    return;
  };
};
