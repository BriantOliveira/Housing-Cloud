import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import clientResponse from "../clientResponse";
import { configuration } from "../../config";

const config = configuration();

export const verifyAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");

  /**
   * Get token from Authorization header.
   * Header format - Authorization: Bearer [token]
   */
  if (req.method !== "OPTIONS") {
    const accessTokenFromClient = req.headers.authorization;
    if (!accessTokenFromClient) {
      return res.status(401).send("Access Token missing from header");
    }

    // Removing the word 'Bearer' from the token payload
    const newToken = accessTokenFromClient.slice(7);
    const verify = await jwt.verify(newToken, config.jwtToken);
    if (!verify) {
      return clientResponse(res, 401);
    }

    return next();
  }

  return next();
};

module.exports = {
  verifyAuthentication,
};
