import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET() {
  try {
    const result = await db.query("SELECT COUNT(*) AS totalissued FROM issued_books");
    return NextResponse.json({ totalIssued: parseInt(result.rows[0].totalissued) });
  } catch (error) {
    console.error("Error counting issued books:", error);
    return NextResponse.json(
      { totalIssued: 0, message: "Failed to fetch issued books count" },
      { status: 500 }
    );
  }
}