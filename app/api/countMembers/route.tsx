import { db } from "../../lib/db";

export async function GET() {
  try {
    const result = await db.query(
      "SELECT COUNT(*) AS totalmembers FROM signup WHERE role = 'Member'"
    );
    return new Response(
      JSON.stringify({ totalMembers: parseInt(result.rows[0].totalmembers) }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}