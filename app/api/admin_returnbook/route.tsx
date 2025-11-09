import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const { issue_id, book_id } = await req.json();

    if (!issue_id || !book_id) {
      return NextResponse.json({
        success: false,
        message: "Missing issue ID or book ID.",
      });
    }

    await db.query(
      "UPDATE issued_books SET status = 'Returned', return_date = CURDATE() WHERE issue_id = ?",
      [issue_id]
    );

    await db.query("UPDATE books SET status = 'Available' WHERE id = ?", [
      book_id,
    ]);

    return NextResponse.json({
      success: true,
      message: "Book marked as returned successfully!",
    });
  } catch (error) {
    console.error("Error marking book as returned:", error);
    return NextResponse.json({
      success: false,
      message: "Database error while updating return status.",
    });
  }
}
