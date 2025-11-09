"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MemberNavbar from "@/app/components/membernavbar";

interface MemberData {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
}

export default function Page() {
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const { username } = JSON.parse(storedUser);
    fetch(`/api/member?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMemberData(data.data);
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
  if (!memberData) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Failed to load profile.
      </div>
    );
  }

  return (
    <>
      <MemberNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5ddc1] cursor-default">
        <h1 className="text-3xl font-bold mb-6 text-black">My Profile</h1>
        <img src="/profile.jpg" alt="Profile" className="w-28 h-28 rounded-full mb-4" />
        <p className="font-semibold text-black">Welcome,</p>
        <p className="text-lg mb-6 text-black">{memberData.username}</p>
        <div className="bg-black text-white rounded-lg p-4 shadow-md border">
          <table className="text-left">
            <tbody>
              <tr>
                <td className="font-bold pr-4">First Name:</td>
                <td>{memberData.firstname}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4">Last Name:</td>
                <td>{memberData.lastname}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4">User Name:</td>
                <td>{memberData.username}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4">Password:</td>
                <td>{memberData.password}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4">Email:</td>
                <td>{memberData.email}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4">Contact:</td>
                <td>{memberData.phone}</td>
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
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
