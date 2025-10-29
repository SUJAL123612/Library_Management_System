
export default function Video() {
  return (
    <>
     <div className="flex justify-center items-center bg-black mt-2">
      <video
        src="/library.mp4"
        autoPlay
        loop
        muted
        className="w-[1250px] h-[700px]"
      />
      <div className="absolute text-center mt-[-500px] cursor-default">
          <h1 className="text-[#00FFFF] text-5xl font-bold drop-shadow-lg"   style={{ fontFamily: "Orbitron, sans-serif" }}>
            Welcome to Online Library
          </h1>
        </div>
    </div>
    </>
  );
}
