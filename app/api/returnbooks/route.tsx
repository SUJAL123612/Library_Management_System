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
      "UPDATE issued_books SET status = 'Returned', return_date = CURRENT_DATE WHERE issue_id = $1",
      [issue_id]
    );

    // Increase quantity back; mark Available when quantity goes above 0
    await db.query(
      "UPDATE books SET quantity = quantity + 1, status = 'Available' WHERE id = $1",
      [book_id]
    );

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
