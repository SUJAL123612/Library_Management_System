import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function PUT(req: Request) {
  try {
    const { issue_id } = await req.json();

    if (!issue_id) {
      return NextResponse.json(
        { message: "Issue ID is required" },
        { status: 400 }
      );
    }

    await db.query(
      "UPDATE issued_books SET fine_status = 'PAID' WHERE issue_id = $1",
      [issue_id]
    );

    return NextResponse.json({ message: "Fine marked as PAID" });
  } catch (error) {
    console.error("Payment update error:", error);
    return NextResponse.json(
      { message: "Error updating fine payment" },
      { status: 500 }
    );
  }
}
