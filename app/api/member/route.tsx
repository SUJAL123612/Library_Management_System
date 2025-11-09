import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json({ success: false, message: "No username provided" }, { status: 400 });
  }
  try {
    const [rows]: any = await db.query("SELECT * FROM signup WHERE username = ?", [username]);
    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
  }
}
