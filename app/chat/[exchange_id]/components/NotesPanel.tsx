'use client';

import { useState, useEffect } from 'react';
import { FileText, Check, Save } from 'lucide-react';

interface NotesPanelProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

export default function NotesPanel({ notes, onNotesChange }: NotesPanelProps) {
  const [localNotes, setLocalNotes] = useState(notes);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localNotes !== notes) {
        setSaveStatus('saving');
        setTimeout(() => {
          onNotesChange(localNotes);
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2000);
        }, 600);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [localNotes, notes, onNotesChange]);

  return (
    <div className="flex flex-col h-64 gap-3">
      {/* Header */}
      <div className="glass-hover p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-sm">Study Notes</h3>
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
            saveStatus === 'saving' ? 'text-amber-400' : saveStatus === 'saved' ? 'text-green-400' : 'text-muted-foreground'
          }`}
        >
          {saveStatus === 'saving' && (
            <>
              <Save className="w-3 h-3 animate-pulse" />
              <span>Saving...</span>
            </>
          )}
          {saveStatus === 'saved' && (
            <>
              <Check className="w-3 h-3" />
              <span>Saved</span>
            </>
          )}
          {saveStatus === 'idle' && <span>Auto-save</span>}
        </div>
      </div>

      {/* Notes Editor */}
      <div className="flex-1 glass-hover p-4 overflow-hidden">
        <textarea
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          className="w-full h-full bg-transparent text-sm resize-none outline-none focus:outline-none text-foreground placeholder-muted-foreground leading-relaxed scroll-smooth scrollbar-hide"
          placeholder="Take notes here. They&apos;ll auto-save as you type..."
        />
      </div>
    </div>
  );
}
