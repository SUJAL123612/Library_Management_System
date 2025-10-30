"use client";
import { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function Page() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<{ name: string; text: string }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    // Temporary guest user
    const newComment = { name: "Guest", text: comment };
    setComments([...comments, newComment]);
    setComment("");
  };

  return (
    <>
      <div className="relative">
        <div className="relative z-20">
          <Navbar />
        </div>
        <img src="/feedback.png" alt="feedback" className="w-full h-screen object-cover"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center -mt-[130px]">
          <div className="relative z-10 mt-20 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg w-[90%] max-w-3xl p-8">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-6 cursor-default">Your Feedback Matters</h1>
            <p className="text-lg text-center text-gray-700 mb-4 cursor-default">If you have any suggestions or questions, please comment below.</p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4">
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write something..." className="w-full h-28 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A90E2] resize-none bg-white/70 text-black font-bold"></textarea>
              <button type="submit" className="bg-[#4A90E2] text-white px-6 py-2 rounded-md hover:bg-[#3B7ACC] transition duration-300 font-bold cursor-pointer">Comment</button>
            </form>
            <div className="mt-10 bg-white/80 rounded-md p-4 shadow-inner max-h-48 overflow-y-auto">
              <table className="w-full text-left text-black">
                <tbody>
                  {comments.length === 0 ? (
                    <tr>
                      <td className="text-gray-500 text-center p-2 cursor-default" colSpan={2}>
                        No comments yet. Be the first to comment!
                      </td>
                    </tr>
                  ) : (
                    comments.map((c, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 last:border-none">
                        <td className="font-semibold pr-3">{c.name}</td>
                        <td>{c.text}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
