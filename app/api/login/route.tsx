import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  const { username, password, role } = await req.json();
  try {
    const result = await db.query(
      "SELECT * FROM signup WHERE username = $1 AND password = $2 AND role = $3",
      [username, password, role]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Access denied: Incorrect username or password",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Login successful!",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({
      success: false,
      message: "Database error!",
    });
  }
}