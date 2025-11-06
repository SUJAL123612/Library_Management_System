"use client";
import AdminNavbar from "@/app/components/adminnavbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminData {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
}

export default function Profile() {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const { username } = JSON.parse(storedUser);
    fetch(`/api/admin?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAdminData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <p>Loading profile...</p>
      </div>
    );
  }
  if (!adminData) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Failed to load profile.
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5ddc1]">
        <h1 className="text-3xl font-bold mb-6 text-black">My Profile</h1>
        <img src="/profile.jpg" alt="Profile" className="w-28 h-28 rounded-full mb-4" />
        <p className="font-semibold text-black">Welcome,</p>
        <p className="text-lg mb-6 text-black">{adminData.username}</p>
        <div className="bg-black text-white rounded-lg p-4 shadow-md border">
          <table className="text-left">
            <tbody>
              <tr>
                <td className="font-bold pr-4">First Name:</td>
                <td>{adminData.firstname}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4">Last Name:</td>
                <td>{adminData.lastname}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4">User Name:</td>
                <td>{adminData.username}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4">Password:</td>
                <td>{adminData.password}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4">Email:</td>
                <td>{adminData.email}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4">Contact:</td>
                <td>{adminData.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              router.push("/login");
            }}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
