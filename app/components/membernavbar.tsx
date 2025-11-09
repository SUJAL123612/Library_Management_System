import Link from "next/link";

export default function MemberNavbar() {
  return (
    <>
      <nav className="text-white bg-black/90  border-transparent h-37  flex">
        <div className="mt-5 ml-[100px]">
          <img src="/logo.png" alt="logo" className="w-42 h-35 cursor-default -m-4"  />
        </div>
        <ul className="ml-[220px] mt-[70px]">
        <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="/member/profile">Profile</Link></li>
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="/member/dashboard">DashBoard</Link></li>
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="/member/books">Books</Link></li>
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="/member/issued_books">Issued Books</Link></li>
          <li className="inline-block mr-8 mb-8 text-[23px] font-sans text-white cursor-pointer hover:text-[#00FFFF]"><Link href="/member/feedback">FeedBack</Link></li>
        </ul>
      </nav>
    </>
  );
}
