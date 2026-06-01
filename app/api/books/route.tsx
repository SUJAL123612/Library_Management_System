import { db } from "../../lib/db";

export async function GET() {
  try {
    const result = await db.query(
      "SELECT id, title, author, category, quantity, status FROM books"
    );
    return new Response(JSON.stringify(result.rows), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return new Response(JSON.stringify({ error: "Database error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}