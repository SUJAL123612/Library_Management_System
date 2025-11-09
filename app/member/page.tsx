"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MemberNavbar from "../components/membernavbar";

export default function MemberPage() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please log in first!");
      router.push("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    if (user.role !== "Member") {
      alert("Access limited to registered Members.");
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <MemberNavbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      </div>
    </>
  );
}
