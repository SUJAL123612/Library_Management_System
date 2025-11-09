import mysql from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const { id, title, author, category, quantity, status } = await req.json();

    if (!id || !title || !author || !category || !quantity) {
      return new Response(
        JSON.stringify({ error: "All fields including ID are required" }),
        { status: 400 }
      );
    }

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "library1",
    });

    await db.execute(
      "INSERT INTO books (id, title, author, category, quantity, status) VALUES (?, ?, ?, ?, ?, ?)",
      [id, title, author, category, quantity, status || "Available"]
    );

    await db.end();

    return new Response(
      JSON.stringify({ message: "Book added successfully" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error adding book:", error);
    return new Response(JSON.stringify({ error: "Failed to add book" }), {
      status: 500,
    });
  }
}
