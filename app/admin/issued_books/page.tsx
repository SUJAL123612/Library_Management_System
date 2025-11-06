"use client";
import { useEffect, useState } from "react";
import AdminNavbar from "../../components/adminnavbar";

export default function Page() {
  const [issuedBooks, setIssuedBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/issued_books")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);

        if (Array.isArray(data)) {
          setIssuedBooks(data);
        } else if (Array.isArray(data.issuedBooks)) {
          setIssuedBooks(data.issuedBooks);
        } else {
          setIssuedBooks([]); 
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching issued books:", err);
        setLoading(false);
      });
  }, []);

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
            <p className="text-center text-lg">
              No books have been issued yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-3 text-left">Issue ID</th>
                    <th className="p-3 text-left">Member Name</th>
                    <th className="p-3 text-left">Book Title</th>
                    <th className="p-3 text-left">Issue Date</th>
                    <th className="p-3 text-left">Return Date</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {issuedBooks.map((item) => (
                    <tr key={item.issue_id} className="border-b hover:bg-gray-100">
                      <td className="p-3">{item.issue_id}</td>
                      <td className="p-3 font-medium">{item.student_name}</td>
                      <td className="p-3">{item.book_title}</td>
                      <td className="p-3">{item.issue_date}</td>
                      <td className="p-3">
                        {item.return_date || "Not Returned"}
                      </td>
                      <td className={`p-3 font-semibold ${item.return_date ? "text-green-600" : "text-red-600"
                        }`}>
                        {item.return_date ? "Returned" : "Issued"}
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
