import mysql from "mysql2/promise";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "library1",
    });

    const [rows] = await connection.execute(`
      SELECT 
        ib.issue_id,
        s.username AS student_name,
        b.title AS book_title,
        ib.issue_date,
        ib.return_date
      FROM issued_books ib
      JOIN signup s ON ib.student_id = s.id
      JOIN books b ON ib.book_id = b.id
      ORDER BY ib.issue_date DESC
    `);

    await connection.end();
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching issued books:", error);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
    });
  }
}
