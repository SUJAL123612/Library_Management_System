"use client";
import AdminNavbar from "@/app/components/adminnavbar";
import { useEffect, useState } from "react";

export default function AdminIssuedBooks() {
  const [issuedBooks, setIssuedBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchIssuedBooks = async () => {
    try {
      const res = await fetch("/api/admin_issued_books");
      if (!res.ok) throw new Error("Failed to fetch data");
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      setIssuedBooks(data);
    } catch (err) {
      console.error("Error fetching issued books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const handleMarkReturned = async (issue_id: number, book_id: number) => {
    if (!confirm("Mark this book as returned?")) return;

    try {
      const res = await fetch("/api/admin_returnbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issue_id, book_id }),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Book marked as returned successfully!");
        fetchIssuedBooks();
      } else {
        alert("❌ Failed to update return status");
      }
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Error while updating book status");
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete all issued book records?"))
      return;
    try {
      const res = await fetch("/api/admin_delete_all_issued_books", {
        method: "DELETE",
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : null;
      if (data && data.success) {
        alert("All issued book records deleted successfully!");
        setIssuedBooks([]); 
      } else {
        alert("Failed to delete records");
      }
    } catch (error) {
      console.error("Error deleting all records:", error);
      alert("Error while deleting all records");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#f5e1c8] text-black py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            📘 Issued Books
          </h1>
          {loading ? (
            <p className="text-center text-lg">Loading issued books...</p>
          ) : issuedBooks.length === 0 ? (
            <p className="text-center text-lg">No books issued yet.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-md">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-3 text-left">Issue ID</th>
                      <th className="p-3 text-left">Username</th>
                      <th className="p-3 text-left">Book Title</th>
                      <th className="p-3 text-left">Issue Date</th>
                      <th className="p-3 text-left">Return Date</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issuedBooks.map((item) => (
                      <tr
                        key={item.issue_id}
                        className="border-b hover:bg-gray-100">
                        <td className="p-3">{item.issue_id}</td>
                        <td className="p-3">{item.username}</td>
                        <td className="p-3">{item.book_title}</td>
                        <td className="p-3">
                          {item.issue_date
                            ? new Date(item.issue_date).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                            : "—"}
                        </td>
                        <td className="p-3">
                          {item.return_date
                            ? new Date(item.return_date).toLocaleDateString("en-IN")
                            : "Not Returned"}
                        </td>
                        <td
                          className={`p-3 font-semibold ${item.status === "Issued"
                              ? "text-red-600"
                              : "text-green-600"
                            }`}>
                          {item.status}
                        </td>
                        <td className="p-3">
                          {item.status === "Issued" ? (
                            <button
                              onClick={() =>
                                handleMarkReturned(item.issue_id, item.book_id)
                              }
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                              Mark Returned
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
      </div>
    </>
  );
}
