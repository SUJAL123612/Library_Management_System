import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function DELETE() {
  try {
    await db.query("DELETE FROM issued_books");

    return NextResponse.json({
      success: true,
      message: "✅ All issued book records deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting issued books:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete issued books" },
      { status: 500 }
    );
  }
}
