import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization') || '';

    if (!authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid Authorization header');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new Error('Token not found');
    }

    // Verify the JWT token
    const decodedToken: any = jwt.verify(token, `dxAlpha@DisciplineX!`);
    return { _id: decodedToken.id, role: decodedToken.role };
  } catch (error: any) {
    throw new Error(error.message || 'Invalid Token');
  }
};
