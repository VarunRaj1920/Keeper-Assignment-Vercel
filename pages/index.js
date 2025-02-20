// pages/index.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlusCircledIcon,
  TrashIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = () => {
    if (editingIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = { title, content };
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([...notes, { title, content }]);
    }
    setTitle("");
    setContent("");
  };

  const editNote = (index) => {
    setTitle(notes[index].title);
    setContent(notes[index].content);
    setEditingIndex(index);
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-yellow-50 via-white to-yellow-50 p-6">
      {/* Main Content Container */}
      <div className="flex flex-col items-center flex-grow">
        {/* Top Centered Title */}
        <motion.h1
          className="text-5xl font-extrabold text-yellow-600 mb-8 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Keeper – Your Ultimate Notes Organizer
        </motion.h1>

        {/* Single Container for Note Taking & Saved Notes */}
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">
          {/* Note Creation Section */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Title"
              className="w-full text-lg font-semibold mb-3 p-2 rounded-md border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Take your note..."
              className="w-full h-24 p-2 rounded-md border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              onClick={addOrUpdateNote}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-yellow-500 text-white font-bold py-2 rounded-md hover:bg-yellow-600 transition-colors"
            >
              <PlusCircledIcon />
              {editingIndex !== null ? "Update Note" : "Add Note"}
            </button>
          </div>

          {/* Saved Notes Section */}
          {notes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {notes.map((note, index) => (
                <motion.div
                  key={index}
                  className="bg-amber-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      {note.title}
                    </h2>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {note.content}
                    </p>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={() => editNote(index)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <Pencil2Icon />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNote(index)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium"
                    >
                      <TrashIcon />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-gray-500 text-sm py-4">
        &copy; Copyright Varun Raj 2025
      </footer>
    </div>
  );
}
