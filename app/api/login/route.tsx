import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  const { username, password, role } = await req.json();
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM signup WHERE username = ? AND password = ? AND role = ?",
      [username, password, role]
    );
    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "Access denied: Incorrect username or password" });
    }
    const user = rows[0];
    return NextResponse.json({
      success: true,
      message: "Login successful!",
      user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Database error!" });
  }
}
