"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MemberNavbar from "@/app/components/membernavbar";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookCount, setBookCount] = useState<number>(0);
  const [issuedCount, setIssuedCount] = useState<number>(0);
  const [pendingFines, setPendingFines] = useState<number>(0); // ✅ NEW

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please log in first!");
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.role !== "Member") {
      alert("Access limited to registered Members..");
      router.push("/login");
      return;
    }

    setUser(parsedUser);

    const fetchCounts = async () => {
      try {
        // Fetch books + issued books
        const [bookRes, issuedRes, finesRes] = await Promise.all([
          fetch("/api/countbooks"),
          fetch("/api/countIssuedBooks"),
          fetch("/api/fines"), // ✅ Get fines
        ]);

        const bookData = await bookRes.json();
        const issuedData = await issuedRes.json();
        const finesData = await finesRes.json();

        // Count pending fines of logged-in member
        const userPendingFines = finesData.filter(
          (f: any) =>
            f.username === parsedUser.username &&
            f.fine_status === "NOT_PAID"
        );

        setBookCount(bookData.totalBooks || 0);
        setIssuedCount(issuedData.totalIssued || 0);
        setPendingFines(userPendingFines.length || 0); // ✅ NEW
      } catch (err) {
        console.error(err);
      }
    };

    fetchCounts();
  }, [router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <>
      <MemberNavbar />
      <div className="min-h-screen bg-[#FAEBD7] text-gray-900 p-10 cursor-default">
        <h1 className="text-4xl font-bold text-center mb-10">Member Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

          {/* Total Books */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <img src="/book.png" alt="books" className="h-20 mx-auto" />
            <h2 className="text-2xl font-semibold mb-3 text-center">Total Books</h2>
            <p className="text-gray-700 text-lg text-center">{bookCount}</p>
          </div>

          {/* Issued Books */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <img src="/issued_books.png" alt="issued books" className="h-20 mx-auto" />
            <h2 className="text-2xl font-semibold mb-3 text-center">Issued Books</h2>
            <p className="text-gray-700 text-lg text-center">{issuedCount}</p>
          </div>

          {/* Active Member */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform h-50">
            <img src="/verified_user.jpg" alt="verified_user" className="h-20 mx-auto" />
            <h2 className="text-2xl font-semibold mb-3 text-center">Active Member</h2>
            <p className="text-gray-700 text-lg text-center">{user.username}</p>
          </div>

          {/* ✅ Pending Fines */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <img src="/fines.jpeg" alt="fines" className="h-20 mx-auto" />
            <h2 className="text-2xl font-semibold mb-3 text-center">Pending Fines</h2>
            <p className="text-gray-700  text-lg text-center">
              {pendingFines}
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
