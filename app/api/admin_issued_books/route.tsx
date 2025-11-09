import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT issued_books.issue_id, issued_books.book_id, issued_books.username,
             issued_books.issue_date, issued_books.return_date, issued_books.status,
             books.title AS book_title
      FROM issued_books
      JOIN books ON issued_books.book_id = books.id
      ORDER BY issued_books.issue_id DESC
    `);

    const formattedRows = rows.map((row: any) => ({
      ...row,
      issue_date: row.issue_date
        ? new Date(row.issue_date).toISOString().split("T")[0]
        : null,
      return_date: row.return_date
        ? new Date(row.return_date).toISOString().split("T")[0]
        : null,
    }));

    return NextResponse.json(formattedRows);
  } catch (error) {
    console.error("Error fetching issued books:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching issued books" },
      { status: 500 }
    );
  }
}
