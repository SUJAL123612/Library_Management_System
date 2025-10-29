import Navbar from "../components/navbar"
import Footer from "../components/footer";


export default function Page() {
  return (
    <>
        <div className="relative z-20">
          <Navbar />
        </div>
        <img src="/library.jpg" alt="library" className="w-full h-screen object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-[#32CD12] text-6xl font-bold drop-shadow-lg cursor-default">Welcome to The Online Library</h1>
        </div>
        <Footer /> 
    </>
  );
}
