"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MemberNavbar from "@/app/components/membernavbar";

export default function Page() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIssueBook = async (book: any) => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user?.username) {
      alert("Please log in to issue a book.");
      return;
    }

    try {
      const res = await fetch("/api/issued_books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book_id: book.id,
          username: user.username,
        }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid JSON response:", text);
        alert(" Server returned an invalid response. Check your /api/issued_booksroute.");
        return;
      }

      if (data.success) {
        alert(`✅ Book "${book.title}" issued successfully!`);
        router.push("/member/issued_books");
      } else {
        alert(`❌ Failed to issue book: ${data.message}`);
      }
    } catch (error) {
      console.error("Error issuing book:", error);
      alert(" Error while issuing book. Please try again later.");
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <MemberNavbar />
      <div className="min-h-screen bg-[#f5e1c8] text-black py-10 cursor-default">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">📚 Books List</h1>
          <div className="flex justify-end mb-6">
            <input type="text" placeholder="Search books by title..."  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 w-60 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black"/>
          </div>
          {loading ? (
            <p className="text-center text-lg">Loading books...</p>
          ) : filteredBooks.length === 0 ? (
            <p className="text-center text-lg">No books found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Author</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Quantity</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Issue</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="border-b hover:bg-gray-100">
                      <td className="p-3">{book.id}</td>
                      <td className="p-3 font-medium">{book.title}</td>
                      <td className="p-3">{book.author}</td>
                      <td className="p-3">{book.category}</td>
                      <td className="p-3">{book.quantity}</td>
                      <td
                        className={`p-3 font-semibold ${
                          book.status === "Available"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}>
                        {book.status}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleIssueBook(book)}
                          disabled={book.status !== "Available"}
                          className={`px-3 py-1 rounded-md text-white font-semibold transition ${
                            book.status === "Available"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}>
                          Issue Book
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
