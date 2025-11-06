"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "../../components/adminnavbar";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [bookCount, setBookCount] = useState<number>(0);

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
        const memberRes = await fetch("/api/countMembers");
        const memberData = await memberRes.json();
        setMemberCount(memberData.totalMembers);
        const bookRes = await fetch("/api/countbooks");
        const bookData = await bookRes.json();
        setBookCount(bookData.totalBooks);
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
      <div className="min-h-screen bg-[#FAEBD7] text-gray-900 p-10">
        <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold mb-3">Total Members</h2>
            <p className="text-gray-700 text-lg">{memberCount}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold mb-3">Total Books</h2>
            <p className="text-gray-700 text-lg">{bookCount}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold mb-3">Active Admin</h2>
            <p className="text-gray-700 text-lg">{user.username}</p>
          </div>
        </div>
      </div>
    </>
  );
}
