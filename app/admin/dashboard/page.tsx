"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "../../components/adminnavbar";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [bookCount, setBookCount] = useState<number>(0);
  const [issuedCount, setIssuedCount] = useState<number>(0);
  const [pendingUsers, setPendingUsers] = useState<number>(0); // NEW

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please log in first!");
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.role !== "Admin") {
      alert("Access denied! Only Admins are allowed.");
      router.push("/login");
      return;
    }

    setUser(parsedUser);

    const fetchCounts = async () => {
      try {
        const [memberRes, bookRes, issuedRes, finesRes] = await Promise.all([
          fetch("/api/countMembers"),
          fetch("/api/countbooks"),
          fetch("/api/countIssuedBooks"),
          fetch("/api/fines"),
        ]);

        const memberData = await memberRes.json();
        const bookData = await bookRes.json();
        const issuedData = await issuedRes.json();
        const finesData = await finesRes.json();

        // ✅ Group fines by user & count who have at least one NOT_PAID fine
        const userMap: Record<string, boolean> = {};

        finesData.forEach((fine: any) => {
          if (fine.fine_status === "NOT_PAID") {
            userMap[fine.username] = true;
          }
        });

        const countPendingUsers = Object.keys(userMap).length;

        setMemberCount(memberData.totalMembers || 0);
        setBookCount(bookData.totalBooks || 0);
        setIssuedCount(issuedData.totalIssued || 0);
        setPendingUsers(countPendingUsers);
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
      <AdminNavbar />
      <div className="min-h-screen bg-[#FAEBD7] text-gray-900 p-10 cursor-default">
        <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <img src="/members.jpg" alt="members" className="h-20 mx-auto" />
            <h2 className="text-2xl font-semibold mb-3 text-center">Total Members</h2>
            <p className="text-gray-700 text-lg text-center">{memberCount}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <img src="/book.png" alt="books" className="h-20 mx-auto" />
            <h2 className="text-2xl font-semibold mb-3 text-center">Total Books</h2>
            <p className="text-gray-700 text-lg text-center">{bookCount}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <img src="/issued_books.png" alt="issued books" className="h-20 mx-auto" />
            <h2 className="text-2xl font-semibold mb-3 text-center">Issued Books</h2>
            <p className="text-gray-700 text-lg text-center">{issuedCount}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <img src="/verified_user.jpg" alt="verified_user" className="h-20 mx-auto" />
            <h2 className="text-2xl font-semibold mb-3 text-center">Active Admin</h2>
            <p className="text-gray-700 text-lg text-center">{user.username}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <img src="/fines.jpeg" alt="fines" className="h-20 mx-auto" />
            <h2 className="text-2xl font-semibold mb-3 text-center">Users With Pending Fines</h2>
            <p className="text-gray-700 text-lg text-center">{pendingUsers}</p>
          </div>

        </div>
      </div>
    </>
  );
}
