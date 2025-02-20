import { motion } from "framer-motion";
import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";

export default function Note({ note, index, setNotes, setEditingIndex }) {
  const deleteNote = () => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      className="p-4 bg-white shadow-lg rounded-lg relative hover:shadow-xl transition duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h2 className="text-xl font-bold">{note.title}</h2>
      <p className="text-gray-700">{note.content}</p>
      <div className="flex justify-between mt-2">
        <button
          className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
          onClick={() => setEditingIndex(index)}
        >
          <Pencil2Icon /> Edit
        </button>
        <button
          className="text-red-500 hover:text-red-700 flex items-center gap-1"
          onClick={deleteNote}
        >
          <TrashIcon /> Delete
        </button>
      </div>
    </motion.div>
  );
}
