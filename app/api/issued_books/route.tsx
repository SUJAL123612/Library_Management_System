import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({
        success: false,
        message: "Username is required",
      });
    }

    const result = await db.query(
      `SELECT 
         i.issue_id, 
         i.book_id, 
         b.title AS book_title, 
         i.issue_date, 
         i.return_date, 
         i.status
       FROM issued_books i
       JOIN books b ON i.book_id = b.id
       WHERE i.username = $1`,
      [username]
    );

    const formattedRows = result.rows.map((row: any) => ({
      ...row,
      issue_date: row.issue_date
        ? new Date(row.issue_date).toISOString().split("T")[0]
        : null,
      return_date: row.return_date
        ? new Date(row.return_date).toISOString().split("T")[0]
        : null,
    }));

    return NextResponse.json({ success: true, data: formattedRows });
  } catch (error) {
    console.error("Error fetching issued books:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching issued books" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { book_id, username } = await req.json();

    if (!book_id || !username) {
      return NextResponse.json({
        success: false,
        message: "Book ID and username are required.",
      });
    }

    // Check quantity before issuing
    const bookResult = await db.query(
      "SELECT quantity FROM books WHERE id = $1",
      [book_id]
    );

    if (bookResult.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Book not found." });
    }

    const quantity = bookResult.rows[0].quantity;
    if (quantity <= 0) {
      return NextResponse.json({ success: false, message: "Book is out of stock." });
    }

    await db.query(
      "INSERT INTO issued_books (book_id, username, issue_date, return_date, status) VALUES ($1, $2, CURRENT_DATE, NULL, 'Issued')",
      [book_id, username]
    );

    // Decrease quantity; mark Issued if quantity hits 0
    await db.query(
      "UPDATE books SET quantity = quantity - 1, status = CASE WHEN quantity - 1 = 0 THEN 'Issued' ELSE status END WHERE id = $1",
      [book_id]
    );

    return NextResponse.json({
      success: true,
      message: "✅ Book issued successfully!",
    });
  } catch (error) {
    console.error("Error issuing book:", error);
    return NextResponse.json({
      success: false,
      message: "Database error while issuing book.",
    });
  }
}
