import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <div className="relative">
                <div className="relative z-20">
                    <Navbar />
                </div>
                <img src="/signup.jpg" alt="signup" className="w-full h-screen object-cover"/>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center -mt-[130px]">
                    <h1 className="text-white text-5xl font-bold text-shadow-lg-dark mb-6 cursor-default ">User Registration Form</h1>
                    <form className="flex flex-col items-center w-full max-w-sm gap-4">
                        <div className="flex"> 
                        <input type="text" placeholder="First Name" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none mr-8 font-semibold"/>
                        <input type="text" placeholder="Last Name" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none font-semibold"/>
                        </div>
                        <div className="flex">
                        <input type="text" placeholder="Username" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none mr-8 font-semibold"/>
                        <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none font-semibold"/>
                        </div>
                        <input type="text" placeholder="ID No" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none font-semibold"/>
                        <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none font-semibold"/>
                        <input type="text" placeholder="Phone No" className="w-full px-4 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none font-semibold"/>
                        <button type="submit" className="w-full bg-[#4A90E2] text-white font-semibold py-2 rounded-md hover:bg-[#3B7ACC] transition-colors duration-500 ease-in-out cursor-pointer">Sign Up</button>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    );
}
