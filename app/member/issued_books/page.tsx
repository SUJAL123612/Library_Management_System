"use client";
import MemberNavbar from "@/app/components/membernavbar";
import { useEffect, useState } from "react";

export default function IssuedBooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    async function fetchBooks() {
      try {
        const res = await fetch(`/api/issued_books?username=${username}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        if (data.success) {
          setBooks(data.data);
        } else {
          console.warn("No books found:", data.message);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [username]);

  const handleReturnBook = async (book: any) => {
    if (!confirm(`Return "${book.book_title}" ?`)) return;

    try {
      const res = await fetch("/api/returnbooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issue_id: book.issue_id, book_id: book.book_id }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Book returned successfully!");
        setBooks((prevBooks) =>
          prevBooks.map((b) =>
            b.issue_id === book.issue_id
              ? { ...b, status: "Returned", return_date: new Date().toISOString().split("T")[0] }
              : b
          )
        );
      } else {
        alert("❌ Failed to return book");
      }
    } catch (error) {
      alert("⚠️ Error while returning book");
      console.error(error);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("⚠️ Are you sure you want to delete all issued books?")) return;

    try {
      const res = await fetch("/api/delete_all_issued_books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (data.success) {
        alert("🗑️ All issued book records deleted successfully!");
        setBooks([]);
      } else {
        alert("❌ Failed to delete records");
      }
    } catch (error) {
      alert(" Error while deleting all records");
      console.error(error);
    }
  };

  if (!username) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Please log in to view your issued books.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading your issued books...
      </div>
    );
  }

  return (
    <>
      <MemberNavbar />
      <div className="p-6 min-h-screen bg-[#f5e1c8]">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          📚 Issued Books
        </h1>
        {books.length === 0 ? (
          <p className="text-center text-lg text-gray-700">
            You have not issued any books yet.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-3">Issue ID</th>
                    <th className="p-3">Book ID</th>
                    <th className="p-3">Book Title</th>
                    <th className="p-3">Issue Date</th>
                    <th className="p-3">Return Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.issue_id} className="border-b text-center hover:bg-gray-100 text-black">
                      <td className="p-3">{book.issue_id}</td>
                      <td className="p-3">{book.book_id}</td>
                      <td className="p-3">{book.book_title}</td>
                      <td className="p-3">
                        {book.issue_date
                          ? new Date(book.issue_date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          : "—"}
                      </td>
                      <td className="p-3">
                        {book.return_date
                          ? new Date(book.return_date).toLocaleDateString("en-IN")
                          : "Not Returned"}
                      </td>
                      <td
                        className={`p-3 font-semibold ${book.status === "Issued" ? "text-red-600" : "text-green-600"
                          }`}>
                        {book.status}
                      </td>
                      <td className="p-3">
                        {book.status === "Issued" ? (
                          <button
                            onClick={() => handleReturnBook(book)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                            Return Book
                          </button>
                        ) : (
                          <span className="text-gray-500">Returned</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-6">
              <button onClick={handleDeleteAll} className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 shadow-md">
                Delete All Issued Books
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
