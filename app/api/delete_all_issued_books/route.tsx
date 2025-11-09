import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({
        success: false,
        message: "Username is required",
      });
    }

    await db.query("DELETE FROM issued_books WHERE username = ?", [username]);

    return NextResponse.json({
      success: true,
      message: "All issued books deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting issued books:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete issued books" },
      { status: 500 }
    );
  }
}
