"use client";
import { useEffect, useState } from "react";
import AdminNavbar from "../../components/adminnavbar";

export default function Page() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id.trim() || !title.trim() || !author.trim() || !category.trim() || !quantity.trim()) {
      alert("Please fill in all fields including ID!");
      return;
    }

    const newBook = { id, title, author, category, quantity };

    const res = await fetch("/api/addbooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });

    if (res.ok) {
      setId("");
      setTitle("");
      setAuthor("");
      setCategory("");
      setQuantity("");
      setShowForm(false);
      fetchBooks();
      alert("✅ Book added successfully!");
    } else {
      alert("❌ Failed to add book. ID may already exist!");
    }
  };
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#f5e1c8] text-black py-10 cursor-default">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">📚 Books List</h1>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center w-full md:w-1/2">
              <input type="text" placeholder="Search by book title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-55 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"/>
            </div>
            <button onClick={() => setShowForm(true)} className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 w-full md:w-auto">
              ➕ Add New Book
            </button>
          </div>
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                <button onClick={() => setShowForm(false)} className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl">
                  ✕
                </button>
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Add New Book
                </h2>
                <form onSubmit={handleAddBook} className="space-y-3">
                  <input type="number" placeholder="Book ID (e.g., 1, 2, 3)" value={id} onChange={(e) => setId(e.target.value)} className="w-full p-2 border rounded" required/>
                  <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required/>
                  <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 border rounded" required/>
                  <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" required/>
                  <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-2 border rounded" min={1} required/>
                  <button type="submit" className="w-full mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    Add Book
                  </button>
                </form>
              </div>
            </div>
          )}
          {loading ? (
            <p className="text-center text-lg">Loading books...</p>
          ) : filteredBooks.length === 0 ? (
            <p className="text-center text-lg">No books found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Author</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Quantity</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="border-b hover:bg-gray-100">
                      <td className="p-3">{book.id}</td>
                      <td className="p-3 font-medium">{book.title}</td>
                      <td className="p-3">{book.author}</td>
                      <td className="p-3">{book.category}</td>
                      <td className="p-3">{book.quantity}</td>
                      <td
                        className={`p-3 font-semibold ${
                          book.status === "Available"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}>
                        {book.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
