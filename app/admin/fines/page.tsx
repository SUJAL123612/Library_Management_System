"use client";
import { useEffect, useState } from "react";
import AdminNavbar from "@/app/components/adminnavbar";

export default function AdminFines() {
  const [fines, setFines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFines = async () => {
    try {
      const res = await fetch("/api/fines");
      const data = await res.json();
      setFines(data);
    } catch (error) {
      console.error("Error fetching fines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFines();
  }, []);

  // DELETE ALL fines handler
  const deleteAllFines = async () => {
    if (!confirm("Are you sure you want to delete ALL fines?")) return;

    try {
      const res = await fetch("/api/fines", { method: "DELETE" });

      if (res.ok) {
        setFines([]);
        alert("All fines deleted successfully!");
      } else {
        alert("Failed to delete fines.");
      }
    } catch (error) {
      console.error("Error deleting fines:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#f5e1c8] text-black py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            💰 Fine Details (Admin)
          </h1>

          {loading ? (
            <p className="text-center text-lg">Loading fines...</p>
          ) : fines.length === 0 ? (
            <p className="text-center text-lg">No fines pending.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-md">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-3 text-left">Issue ID</th>
                      <th className="p-3 text-left">Username</th>
                      <th className="p-3 text-left">Book Title</th>
                      <th className="p-3 text-left">Overdue Days</th>
                      <th className="p-3 text-left">Fine (₹)</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {fines.map((item) => (
                      <tr
                        key={item.issue_id}
                        className="border-b hover:bg-gray-100"
                      >
                        <td className="p-3">{item.issue_id}</td>
                        <td className="p-3">{item.username}</td>
                        <td className="p-3">{item.book_title}</td>
                        <td className="p-3">{item.overdue_days}</td>

                        <td className="p-3 font-semibold text-red-600">
                          ₹{item.fine}
                        </td>

                        {/* ⭐ Show PAID / NOT PAID from DB */}
                        <td className="p-3 font-semibold">
                          {item.fine_status === "PAID" ? (
                            <span className="text-green-700 font-bold">PAID</span>
                          ) : (
                            <span className="text-red-700 font-bold">NOT PAID</span>
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* DELETE ALL BUTTON */}
              <div className="text-center mt-6">
                <button
                  onClick={deleteAllFines}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                >
                  Delete All Fines
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
