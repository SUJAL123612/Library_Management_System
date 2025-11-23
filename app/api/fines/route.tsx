import { NextResponse } from "next/server";
import { db } from "../../lib/db";

const TEST_MODE = false;

function calculateFine(issueDate: string, returnDate: string) {
  const issue = new Date(issueDate);
  const returned = new Date(returnDate);

  const diffMs = returned.getTime() - issue.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let overdueDays = 0;
  let fine = 0;

  if (TEST_MODE) {
    overdueDays = 1;
    fine = overdueDays * 10;
    return { overdueDays, fine };
  }

  if (diffDays >= 1) {
    overdueDays = diffDays;
    fine = overdueDays * 10;
  }

  return { overdueDays, fine };
}

export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        ib.issue_id AS issue_id,
        ib.username,
        b.title AS book_title,
        ib.issue_date,
        ib.return_date,
        ib.fine_status
      FROM issued_books ib
      JOIN books b ON ib.book_id = b.id
      WHERE ib.return_date IS NOT NULL;
    `);

    const fines = rows.map((row: any) => {
      const { overdueDays, fine } = calculateFine(
        row.issue_date,
        row.return_date
      );

      return {
        issue_id: row.issue_id,
        username: row.username,
        book_title: row.book_title,
        overdue_days: overdueDays,
        fine,
        fine_status: row.fine_status,
      };
    });

    return NextResponse.json(fines);
  } catch (error) {
    console.error("Fine fetch error:", error);
    return NextResponse.json(
      { message: "Database error fetching fines" },
      { status: 500 }
    );
  }
}

// DELETE ALL FINES
export async function DELETE() {
  try {
    await db.query(`
      DELETE FROM issued_books
      WHERE return_date IS NOT NULL;
    `);

    return NextResponse.json({ message: "All fines deleted successfully." });
  } catch (error) {
    console.error("Fine delete error:", error);
    return NextResponse.json(
      { message: "Error deleting fines" },
      { status: 500 }
    );
  }
}

// ✅ STEP 1 — UPDATE FINE STATUS (PAY)
export async function PUT(req: Request) {
  try {
    const { issue_id } = await req.json();

    if (!issue_id) {
      return NextResponse.json(
        { message: "issue_id is required" },
        { status: 400 }
      );
    }

    await db.query(
      `UPDATE issued_books SET fine_status = 'PAID' WHERE issue_id = ?`,
      [issue_id]
    );

    return NextResponse.json({ message: "Fine marked as PAID" });
  } catch (error) {
    console.error("Fine update error:", error);
    return NextResponse.json(
      { message: "Error updating fine" },
      { status: 500 }
    );
  }
}
