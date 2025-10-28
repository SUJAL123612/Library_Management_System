import Link from "next/link";
import Footer from "./footer";
import Video from "./video";

export default function Navbar() {
  return (
    <>
      <nav className="text-white bg-black/90  border-transparent h-37  flex">
        <div className="mt-5 ml-[100px]">
          <img src="logo.png" alt="logo" className="w-42 h-35 cursor-default -m-4" id="home" />
        </div>
        <ul className="ml-[470px] mt-[70px]">
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="#home">Home</Link></li>
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="#skills">Books</Link></li>
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="#education">Login</Link></li>
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="#projects">Sign-Up</Link></li>
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="#contact">FeedBack</Link></li>
        </ul>
      </nav>
      <Video />
      <Footer />
    </>
  );
}
