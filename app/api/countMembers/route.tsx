import mysql from "mysql2/promise";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "library1",
    });
    const [rows] = await connection.execute<any[]>(
      "SELECT COUNT(*) AS totalMembers FROM signup where role='Member'"
    );
    await connection.end();
    return new Response(JSON.stringify({ totalMembers: rows[0].totalMembers }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}
