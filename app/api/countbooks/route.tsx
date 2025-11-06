import mysql from "mysql2/promise";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "", 
      database: "library1", 
    });
    const [rows]: any = await connection.execute(
      "SELECT COUNT(*) AS totalbooks FROM books"
    );
    await connection.end();
    return new Response(JSON.stringify({ totalBooks: rows[0].totalbooks }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching total books:", error);
    return new Response(
      JSON.stringify({ error: "Database error while counting books" }),
      { status: 500 }
    );
  }
}
