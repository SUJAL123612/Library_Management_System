import mysql from "mysql2/promise";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root", 
      password: "",
      database: "library1", 
    });

    const [rows] = await connection.execute(
      "SELECT id, title, author, category, quantity, status FROM books"
    );
    await connection.end();
    return new Response(JSON.stringify(rows), {
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
