import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET() {
  try {
    const [rows]: any = await db.query("SELECT COUNT(*) AS totalIssued FROM issued_books");
    return NextResponse.json({ totalIssued: rows[0].totalIssued });
  } catch (error) {
    console.error("Error counting issued books:", error);
    return NextResponse.json(
      { totalIssued: 0, message: "Failed to fetch issued books count" },
      { status: 500 }
    );
  }
}
