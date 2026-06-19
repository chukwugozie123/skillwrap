import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BookOpen, Trash2, Save, X } from "lucide-react";

interface NotesPanelProps {
  open: boolean;
  onClose: () => void;
}

const STORAGE_KEY = "skillwrap-learning-notes";

export default function NotesPanel({ open, onClose }: NotesPanelProps) {
  const [notes, setNotes] = useState(() => localStorage.getItem(STORAGE_KEY) || "");
  const [saved, setSaved] = useState(false);
  const autoSaveRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-save after 1s of inactivity
  useEffect(() => {
    if (!notes) return;

    if (autoSaveRef.current) clearTimeout(autoSaveRef.current);

    autoSaveRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, notes);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, 1000);

    return () => {
      if (autoSaveRef.current) clearTimeout(autoSaveRef.current);
    };
  }, [notes]);

  function handleSave() {
    localStorage.setItem(STORAGE_KEY, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function handleClear() {
    setNotes("");
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: open ? 0 : 300, opacity: open ? 1 : 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed lg:relative right-0 top-0 h-full w-80 lg:w-80 z-40 bg-navy-900/95 lg:bg-transparent border-l border-white/10 lg:border-l-0 flex flex-col ${
          open ? "" : "lg:hidden pointer-events-none"
        }`}
      >
        <div className="glass rounded-none lg:rounded-2xl h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-cyan-400" />
              <h3 className="text-sm font-bold text-white">My Learning Notes</h3>
            </div>
            <div className="flex items-center gap-2">
              {saved && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-green-400"
                >
                  Saved
                </motion.span>
              )}
              <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Textarea */}
          <div className="flex-1 p-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write important points here..."
              className="w-full h-full resize-none bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition"
            />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{notes.length} characters</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 text-xs font-medium hover:bg-cyan-500/25 transition"
              >
                <Save size={12} />
                Save
              </button>
              <button
                onClick={handleClear}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-400/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
