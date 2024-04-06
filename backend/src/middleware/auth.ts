import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    jwt.verify(authToken, process.env.JWT_SECRET as string, (error, decode) => {
      if (error) {
        return res.status(403).json({
          msg: "unauthorized",
        });
      }
      // @ts-ignore
      req.userId = decode?.id;
      return next();
    });
}
   else {
    return res.status(401).json({
          msg: "unauthorized",
    });
}
};
