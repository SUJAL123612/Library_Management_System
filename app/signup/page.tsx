"use client";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    // const handleSignup = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const firstName = (document.querySelector('input[placeholder="First Name"]') as HTMLInputElement).value;
    //     const lastName = (document.querySelector('input[placeholder="Last Name"]') as HTMLInputElement).value;
    //     const username = (document.querySelector('input[placeholder="Username"]') as HTMLInputElement).value;
    //     const password = (document.querySelector('input[placeholder="Password"]') as HTMLInputElement).value;
    //     const email = (document.querySelector('input[placeholder="Email"]') as HTMLInputElement).value;
    //     const phone = (document.querySelector('input[placeholder="Phone No"]') as HTMLInputElement).value;
    //     const role = (document.querySelector('select[name="role"]') as HTMLSelectElement).value;
    //     const res = await fetch("/api/signup", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ firstName, lastName, username, password, email, phone, role }),
    //     });
    //     const data = await res.json();
    //     alert(data.message);
    //     if (data.success) {
    //         router.push("/login");
    //     }
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const firstName = (document.querySelector('input[placeholder="First Name"]') as HTMLInputElement).value;
        const lastName = (document.querySelector('input[placeholder="Last Name"]') as HTMLInputElement).value;
        const username = (document.querySelector('input[placeholder="Username"]') as HTMLInputElement).value;
        const password = (document.querySelector('input[placeholder="Password"]') as HTMLInputElement).value;
        const email = (document.querySelector('input[placeholder="Email"]') as HTMLInputElement).value;
        const phone = (document.querySelector('input[placeholder="Phone No"]') as HTMLInputElement).value;
        const role = (document.querySelector('select[name="role"]') as HTMLSelectElement).value;
    
        const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, username, password, email, phone, role }),
        });
    
        const data = await res.json();
        alert(data.message);
    
        if (data.success) {
    
            // ✅ Send Gmail Notification
            await fetch("/api/sendSignupEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username }),
            });
    
            // Redirect to login
            router.push("/login");
        }
    };
    return (
        <>
            <div className="relative">
                <div className="relative z-20">
                    <Navbar />
                </div>
                <img src="signup.jpg" alt="signup" className="w-full h-screen object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center -mt-[130px]">
                    <h1 className="text-white text-5xl font-bold text-shadow-lg-dark mb-6 cursor-default">Member Registration Form</h1>
                    <form onSubmit={handleSignup} className="flex flex-col items-center w-full max-w-sm gap-4">
                        <div className="flex">
                            <input type="text" placeholder="First Name" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none mr-8 font-semibold" />
                            <input type="text" placeholder="Last Name" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none font-semibold" />
                        </div>
                        <div className="flex">
                            <input type="text" placeholder="Username" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none mr-8 font-semibold" />
                            <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none font-semibold" />
                        </div>
                        <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none font-semibold" />
                        <input type="text" placeholder="Phone No" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none font-semibold" />
                        <select name="role" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 focus:outline-none font-semibold">
                            <option value="Member">Member</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <button type="submit" className="w-full bg-[#4A90E2] text-white font-semibold py-2 rounded-md hover:bg-[#3B7ACC] transition-colors duration-500 ease-in-out cursor-pointer">Sign Up</button>
                    </form>
                </div>
                <div className="relative z-5">
                    <Footer />
                </div>
            </div>
        </>
    );
}
