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

    const [rows]: any = await db.query(
      `SELECT 
         i.issue_id, 
         i.book_id, 
         b.title AS book_title, 
         i.issue_date, 
         i.return_date, 
         i.status
       FROM issued_books i
       JOIN books b ON i.book_id = b.id
       WHERE i.username = ?`,
      [username]
    );

    const formattedRows = rows.map((row: any) => ({
      ...row,
      issue_date: row.issue_date
        ? new Date(row.issue_date).toISOString().split("T")[0]
        : null,
      return_date: row.return_date
        ? new Date(row.return_date).toISOString().split("T")[0]
        : null,
    }));

    return NextResponse.json({
      success: true,
      data: formattedRows,
    });
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

    await db.query(
      "INSERT INTO issued_books (book_id, username, issue_date, return_date, status) VALUES (?, ?, CURDATE(), NULL, 'Issued')",
      [book_id, username]
    );

    await db.query("UPDATE books SET status = 'Issued' WHERE id = ?", [book_id]);

    

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
