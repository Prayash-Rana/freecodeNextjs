import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const getDataFromToken = (request: NextRequest): string => {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    if (typeof decodedToken === "object" && "id" in decodedToken) {
      return decodedToken.id;
    } else {
      throw new Error("Invalid token format");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
