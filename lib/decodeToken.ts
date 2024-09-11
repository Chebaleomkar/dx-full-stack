import {jwtDecode} from "jwt-decode";

type DecodedToken = {
  id: number;
  role: string;
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      return decodedToken;
    }
    return null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
