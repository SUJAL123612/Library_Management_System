"use client";
import { useState, useEffect } from "react";
import MemberNavbar from "@/app/components/membernavbar";

export default function Page() {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<{ username: string; role: string; feedback: string }[]>([]);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUsername(user.username || "");
            setRole(user.role || "");
        }

        fetch("/api/feedback")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setComments(data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        if (!username || !role) {
            alert("Please log in to submit feedback.");
            return;
        }

        const res = await fetch("/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, role, feedback: comment }),
        });

        const data = await res.json();
        alert(data.message);

        if (data.success) {
            setComments([{ username, role, feedback: comment }, ...comments]);
            setComment("");
        }
    };
    return (
        <>
            <MemberNavbar />
            <div className="min-h-screen bg-[#f5e1c8] text-black">
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-3xl p-8 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6 cursor-default">
                            Your Feedback Matters
                        </h1>
                        <p className="text-lg text-gray-700 mb-4 cursor-default">
                            If you have any suggestions or questions, please comment below.
                        </p>
                        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                            <div className="flex w-full justify-between text-gray-900 font-semibold cursor-default">
                                <p>{role || "Not logged in"}</p>
                                <p>Username: {username || "Not logged in"}</p>
                            </div>
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write something..." className="w-full h-28 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A90E2] resize-none bg-white text-black font-bold"></textarea>
                            <button type="submit" className="bg-[#4A90E2] text-white px-6 py-2 rounded-md hover:bg-[#3B7ACC] transition duration-300 font-bold cursor-pointer">
                                Comment
                            </button>
                        </form>
                        <div className="mt-10 bg-white rounded-md p-4 shadow-inner max-h-64 overflow-y-auto">
                            <table className="w-full text-left text-black">
                                <tbody>
                                    {comments.length === 0 ? (
                                        <tr>
                                            <td className="text-gray-500 text-center p-2 cursor-default" colSpan={3}>
                                                No comments yet. Be the first to comment!
                                            </td>
                                        </tr>
                                    ) : (
                                        comments.map((c, index) => (
                                            <tr key={index} className="border-b border-gray-300 last:border-none">
                                                <td className="font-semibold pr-3">{c.role}</td>
                                                <td className="font-semibold pr-3">Username: {c.username}</td>
                                                <td className="pr-3">{c.feedback}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
