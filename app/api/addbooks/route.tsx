import mysql from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const { title, author, category, quantity, status } = await req.json();
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "library1",
    });
    await db.execute(
      "INSERT INTO books (title, author, category, quantity, status) VALUES (?, ?, ?, ?, ?)",
      [title, author, category, quantity, status || "Available"]
    );
    await db.end();
    return new Response(JSON.stringify({ message: "Book added successfully" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error adding book:", error);
    return new Response(JSON.stringify({ error: "Failed to add book" }), {
      status: 500,
    });
  }
}
