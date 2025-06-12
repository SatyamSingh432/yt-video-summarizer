import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import jwt from "jsonwebtoken";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Decoded token:", decoded);
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export { isAdmin };
