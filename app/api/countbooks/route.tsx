import { db } from "../../lib/db";

export async function GET() {
  try {
    const result = await db.query("SELECT COUNT(*) AS totalbooks FROM books");
    return new Response(
      JSON.stringify({ totalBooks: parseInt(result.rows[0].totalbooks) }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching total books:", error);
    return new Response(
      JSON.stringify({ error: "Database error while counting books" }),
      { status: 500 }
    );
  }
}