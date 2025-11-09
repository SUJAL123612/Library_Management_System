import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const { issue_id, book_id } = await req.json();

    if (!issue_id || !book_id) {
      return NextResponse.json({
        success: false,
        message: "Issue ID and Book ID are required.",
      });
    }

    await db.query(
      "UPDATE issued_books SET status = 'Returned', return_date = CURDATE() WHERE issue_id = ?",
      [issue_id]
    );

    await db.query("UPDATE books SET status = 'Available' WHERE id = ?", [book_id]);

    return NextResponse.json({
      success: true,
      message: "✅ Book returned successfully!",
    });
  } catch (error) {
    console.error("Error returning book:", error);
    return NextResponse.json({
      success: false,
      message: "Database error while returning book.",
    });
  }
}
