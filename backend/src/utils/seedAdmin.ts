import bcrypt from "bcrypt";
import User from "../models/user.model.ts";

export async function seedAdmin() {
  const adminEmail = "admin@admin.com";
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin@123", 10);
    await User.create({
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Admin user created");
  } else {
    console.log("ℹ️ Admin user already exists");
  }
}
