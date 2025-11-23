"use client";
import { useEffect, useState } from "react";
import MemberNavbar from "@/app/components/membernavbar";

export default function MemberFines() {
  const [fines, setFines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  // ✅ CORRECT WAY TO GET LOGGED-IN USER
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUsername(parsed.username); // correct
    }
  }, []);

  const fetchFines = async () => {
    if (!username) return;

    try {
      const res = await fetch("/api/fines");
      const data = await res.json();

      const userFines = data.filter((item: any) => item.username === username);
      setFines(userFines);
    } catch (error) {
      console.error("Error fetching fines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFines();
  }, [username]);

  const handlePay = async (fine: any) => {
    const confirmPay = confirm(`Pay ₹${fine.fine} for ${fine.book_title}?`);
    if (!confirmPay) return;

    const res = await fetch("/api/fines", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ issue_id: fine.issue_id }),
    });

    const data = await res.json();
    alert(data.message);

    // Update UI instantly (without reload)
    setFines((prev) =>
      prev.map((f) =>
        f.issue_id === fine.issue_id ? { ...f, fine_status: "PAID" } : f
      )
    );
  };

  // ✅ DELETE ALL FINES (USER-SIDE)
  const handleDeleteAll = async () => {
    const confirmDelete = confirm("Are you sure you want to delete ALL fines?");
    if (!confirmDelete) return;

    const res = await fetch("/api/fines", { method: "DELETE" });
    const data = await res.json();

    alert(data.message);

    // Remove all fines from UI
    setFines([]);
  };

  return (
    <>
      <MemberNavbar />
      <div className="min-h-screen bg-[#e9dccb] text-black py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-center">💸 My Fines</h1>

            {/* ✅ DELETE ALL BUTTON */}
            {fines.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md"
              >
                Delete All
              </button>
            )}
          </div>

          {loading ? (
            <p className="text-center text-lg">Loading fines...</p>
          ) : fines.length === 0 ? (
            <p className="text-center text-lg">
              No fines pending. Great job! 🎉
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-3 text-left">Book Title</th>
                    <th className="p-3 text-left">Overdue Days</th>
                    <th className="p-3 text-left">Fine (₹)</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fines.map((item) => (
                    <tr
                      key={item.issue_id}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="p-3">{item.book_title}</td>
                      <td className="p-3">{item.overdue_days}</td>
                      <td className="p-3 font-semibold text-red-600">
                        ₹{item.fine}
                      </td>
                      <td className="p-3">
                        {item.fine_status === "PAID" ? (
                          <span className="bg-green-700 text-white py-1 px-4 rounded-lg shadow-md">
                            Paid ✔
                          </span>
                        ) : (
                          <button
                            onClick={() => handlePay(item)}
                            className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-lg shadow-md"
                          >
                            Pay
                          </button>
                        )}
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
