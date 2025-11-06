"use client";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Link from "next/link";

export default function Page() {
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const roleInput = document.querySelector('input[name="role"]:checked') as HTMLInputElement;
    const role = roleInput ? roleInput.value : "";
    const username = (document.querySelector('input[placeholder="Username"]') as HTMLInputElement).value.trim();
    const password = (document.querySelector('input[placeholder="Password"]') as HTMLInputElement).value.trim();
    if (!username || !password || !role) {
      alert("Please fill in all fields and select a role.");
      return;
    }
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });
    const data = await res.json();
    alert(data.message);
    if (data.success) {
      localStorage.setItem("user", JSON.stringify({ username, role }));
      if (role === "Admin") {
        window.location.href = "/admin/profile";
      } else if (role === "Member") {
        window.location.href = "/user";
      } else {
        window.location.href = "/books";
      }
    }
  };

  return (
    <>
      <div className="relative">
        <div className="relative z-20">
          <Navbar />
        </div>
        <img src="login.jpg" alt="login" className="w-full h-screen object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center -mt-[100px]">
          <h1 className="text-white text-5xl font-bold text-shadow-lg-dark mb-6 cursor-default">
            Member Login Form
          </h1>
          <div className="text-white text-xl mb-4 font-semibold drop-shadow-md">
            <p className="mb-2 cursor-default">Login as:</p>
            <div className="flex items-center justify-center gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="role" value="Admin" className="accent-blue-500" />
                Admin
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="role" value="Member" className="accent-blue-500" />
                Member
              </label>
            </div>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col items-center w-full max-w-sm gap-4" autoComplete="off">
            <input type="text" placeholder="Username" autoComplete="off" inputMode="none" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none font-semibold"/>
            <input type="password" placeholder="Password" autoComplete="new-password" data-no-password-manager="true" inputMode="none" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none font-semibold"/>
            <button type="submit" className="w-full bg-[#4A90E2] text-white font-semibold py-2 rounded-md hover:bg-[#3B7ACC] transition cursor-pointer">
              Login
            </button>
          </form>
          <p className="text-white mt-4 cursor-default">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-yellow-400 font-semibold hover:underline ml-1">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="relative z-5">
          <Footer />
        </div>
      </div>
    </>
  );
}
