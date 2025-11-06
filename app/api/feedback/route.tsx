import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  const { username, role, feedback } = await req.json();
  if (!username || !role || !feedback) {
    return NextResponse.json({ success: false, message: "Missing fields" });
  }
  try {
    await db.query(
      "INSERT INTO feedbacks (username, role, feedback, created_at) VALUES (?, ?, ?, NOW())",
      [username, role, feedback]
    );
    return NextResponse.json({ success: true, message: "Feedback submitted!" });
  } catch (err) {
    console.error("Error inserting feedback:", err);
    return NextResponse.json({ success: false, message: "Database error" });
  }
}

export async function GET() {
  try {
    const [rows]: any = await db.query(
      "SELECT username, role, feedback, created_at FROM feedbacks ORDER BY created_at DESC"
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    return NextResponse.json({ success: false, message: "Database error" });
  }
}

export async function DELETE() {
  try {
    await db.query("DELETE FROM feedbacks");
    return NextResponse.json({ success: true, message: "All feedbacks deleted successfully!" });
  } catch (err) {
    console.error("Error deleting feedbacks:", err);
    return NextResponse.json({ success: false, message: "Database error while deleting" });
  }
}
