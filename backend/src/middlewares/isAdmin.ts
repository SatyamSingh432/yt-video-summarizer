import { type NextFunction, type Request, type Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (
      typeof decoded !== "object" ||
      !("role" in decoded) ||
      !("id" in decoded)
    ) {
      res.status(403).json({ error: "Invalid token format" });
      return;
    }

    if ((decoded as JwtPayload).role !== "admin") {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    req.userId = (decoded as JwtPayload).id as string;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
};

export { isAdmin };
