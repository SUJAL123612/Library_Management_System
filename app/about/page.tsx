"use client";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function Page() {
  return (
    <>
      <div className="relative min-h-screen">
        <div className="relative z-20">
          <Navbar/>
        </div>
        <img src="login.jpg" alt="login" className="w-full h-screen object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-0 font-sans">
          <div className="bg-white/70 text-black backdrop-blur-md rounded-2xl shadow-lg w-full max-w-3xl p-8 text-center cursor-default mt-[-50px]">
            <p className="text-md md:text-xl leading-relaxed mb-4">
              Welcome to our Library Management System, your gateway to a world of knowledge and discovery. Our mission is to
              provide seamless access to a vast collection of books, journals, and digital resources, empowering learners,
              educators, and readers alike.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              We believe that libraries are the heart of every community — a place where ideas flourish and curiosity is nurtured.
              Our system is designed to make book management easy, intuitive, and efficient, so you can focus on what really matters
              — exploring information and enriching your mind.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              Whether you are a student, researcher, or casual reader, our platform offers you quick access to search, borrow, and
              manage your library resources anytime, anywhere.
            </p>
            <div className="mt-6 flex justify-center gap-6">
              <img src="bookshelf.png" alt="Bookshelf" className="h-20 w-20 object-contain transform transition-transform duration-300 ease-in-out hover:scale-110"/>
              <img src="Reading.png" alt="Reading" className="h-20 w-20 object-contain transform transition-transform duration-300 ease-in-out hover:scale-110"/>
            </div>
          </div>
        </div>
        <div className="relative z-20">
          <Footer/>
        </div>
      </div>
    </>
  );
}
