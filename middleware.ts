import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Middleware for JWT authentication
export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  // If no Authorization header is present, deny access
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    // Verify JWT token
    const decodedToken: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "dxAlpha@DisciplineX!"
    );

    // Attach user info to the request
    req.headers.set("x-user-id", decodedToken._id);
    req.headers.set("x-user-role", decodedToken.role);

    // Allow request to proceed to the API
    return NextResponse.next();
  } catch (error) {
    return new NextResponse("Invalid Token", { status: 403 });
  }
}

// Apply this middleware to all requests under the `api` folder
export const config = {
  matcher: ["/api/:path*"], // Apply middleware to all /api routes
};
