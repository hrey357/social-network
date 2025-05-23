import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export function extractInfoToken(req: Request): string | jwt.JwtPayload {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    throw new Error("Token not provied");
  }
  try {
    const payload = jwt.verify(
      token,
      process.env.SEED_AUTENTICACION || "este-es-el-seed-desarrollo"
    );
    // console.log(payload);

    return payload;
  } catch (error) {
    throw new Error("The access token is missing or invalid.");
  }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = extractInfoToken(req);
    if (payload) {
      //   console.log(payload);
      next();
    }
  } catch (error) {
    console.log({ error });

    return res.status(401).json({
      error: "The access token is missing or invalid.",
    });
  }
}
