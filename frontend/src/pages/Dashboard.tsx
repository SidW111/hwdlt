import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Note = {
  _id: string;
  title: string;
  content: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [notes, setNotes] = useState<Note[]>([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

 useEffect(() => {
  const fetchData = async () => {
    const userData = localStorage.getItem("user");
    const tokenn = localStorage.getItem("token");

    if (!tokenn) {
      navigate("/login");
      return;
    }

    if (userData) setUser(JSON.parse(userData));

    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        headers: { Authorization: `Bearer ${tokenn}` },
      });
      const data = await res.json();
      setNotes(data.notes);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  fetchData();
}, []);




  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      if (isEditing && editId) {
        const res = await fetch(`http://localhost:3000/api/notes/${editId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        setNotes((prev) =>
          prev.map((n) => (n._id === editId ? { ...n, ...data.note } : n))
        );
        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await fetch("http://localhost:3000/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        setNotes([data.note, ...notes]);
      }

      setForm({ title: "", content: "" });
    } catch (err) {
      console.error("Note operation failed", err);
    }
  };

  const handleEdit = (note: Note) => {
    setForm({ title: note.title, content: note.content });
    setEditId(note._id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white text-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <img src="/image.png" alt="logo" className="w-5 h-5" />
          <span className="font-semibold text-lg">Dashboard</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          Sign Out
        </button>
      </div>

      {/* Welcome */}
      {/* Welcome - Styled like Notes */}
<div className="max-w-xl mx-auto border rounded px-4 py-3 shadow-sm mb-6 text-sm">
  <p className="font-medium">Welcome, {user.name}!</p>
  <p>Email: {user.email.replace(/(.{2})(.*)(@.*)/, "$1xxxxxx$3")}</p>
</div>


      {/* Create or Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 rounded-md p-4 mb-6 max-w-xl mx-auto space-y-3"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Note title"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Note content"
          className="w-full border px-4 py-2 rounded"
          rows={3}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? "Update Note" : "Create Note"}
        </button>
      </form>

      {/* Notes Display */}
      <div className="max-w-xl mx-auto">
        <h3 className="font-medium mb-2">Your Notes</h3>
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="border p-4 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{note.title}</p>
                <p className="text-sm text-gray-600">{note.content}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
