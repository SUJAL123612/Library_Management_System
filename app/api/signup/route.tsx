import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  const { firstName, lastName, username, password, email, phone, role } = await req.json();

  try {
    const [existing]: any = await db.query("SELECT * FROM signup WHERE username = ?", [username]);
    if (existing.length > 0) {
      return NextResponse.json({ success: false, message: "Username already exists!" });
    }
    const userRole = role === "Admin" ? "Admin" : "Member";
    await db.query(
      "INSERT INTO signup (firstname, lastname, username, password, email, phone, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [firstName, lastName, username, password, email, phone, userRole]
    );
    return NextResponse.json({ success: true, message: "Account created successfully!" });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ success: false, message: "Database error!" });
  }
}
