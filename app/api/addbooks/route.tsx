import { db } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const { title, author, category, quantity, status } = await req.json();

    if (!title || !author || !category || !quantity) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    await db.query(
      "INSERT INTO books (title, author, category, quantity, status) VALUES ($1, $2, $3, $4, $5)",
      [title, author, category, quantity, status || "Available"]
    );

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
