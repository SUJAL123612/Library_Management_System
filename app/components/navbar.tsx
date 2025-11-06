import Link from "next/link";
import Footer from "./footer";


export default function Navbar() {
  return (
    <>
      <nav className="text-white bg-black/90  border-transparent h-37  flex">
        <div className="mt-5 ml-[100px]">
          <img src="logo.png" alt="logo" className="w-42 h-35 cursor-default -m-4"  />
        </div>
        <ul className="ml-[220px] mt-[70px]">
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="/">Home</Link></li>
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="/login">Login</Link></li>
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="/signup">Sign-Up</Link></li>
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="/feedback">FeedBack</Link></li>
        </ul>
      </nav>
    </>
  );
}
