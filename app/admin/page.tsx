"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "../components/adminnavbar";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please log in first!");
      router.push("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    if (user.role !== "Admin") {
      alert("Access denied! Only Admins are allowed.");
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      </div>
    </>
  );
}
