import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Request type locally
interface AuthenticatedRequest extends Request {
  userId?: string;
}

function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "string") {
      res.status(401).json({ error: "Invalid token format" });
      return;
    }

    req.userId = (decoded as JwtPayload).id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
}

export { authenticate };
