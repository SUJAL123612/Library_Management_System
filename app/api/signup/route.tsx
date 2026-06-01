import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  const { firstName, lastName, username, password, email, phone, role } = await req.json();

  try {
    const existing = await db.query("SELECT * FROM signup WHERE username = $1", [username]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ success: false, message: "Username already exists!" });
    }

    const userRole = role === "Admin" ? "Admin" : "Member";

    await db.query(
      "INSERT INTO signup (firstname, lastname, username, password, email, phone, role) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [firstName, lastName, username, password, email, phone, userRole]
    );

    try {
      await fetch("http://localhost:3000/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
          message: `Hi ${firstName}, your account has been created successfully!`,
        }),
      });
    } catch (smsErr) {
      console.error("SMS sending failed:", smsErr);
    }

    return NextResponse.json({ success: true, message: "Account created successfully!" });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ success: false, message: "Database error!" });
  }
}