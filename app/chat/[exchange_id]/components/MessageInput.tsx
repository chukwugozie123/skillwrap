'use client';

import { useState } from 'react';
import { Send, Paperclip, Mic, Plus } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onVoiceClick: () => void;
}

export default function MessageInput({ onSendMessage, onVoiceClick }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Action Buttons Row */}
      <div className="flex items-center gap-2 px-4">
        <button
          className="p-2 rounded-lg glass-hover hover:bg-white/10 transition-all duration-300 text-muted-foreground hover:text-foreground"
          title="Add attachment"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-lg glass-hover hover:bg-white/10 transition-all duration-300 text-muted-foreground hover:text-foreground"
          title="Attach file"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <button
          onClick={onVoiceClick}
          className="p-2 rounded-lg glass-hover hover:bg-white/10 transition-all duration-300 text-muted-foreground hover:text-purple-400"
          title="Voice input"
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>

      {/* Input Box */}
      <div
        className={`glass-hover px-4 py-3 transition-all duration-300 ${
          isFocused ? 'ring-2 ring-indigo-500/50 bg-white/10 border-indigo-500/30' : ''
        }`}
      >
        <div className="flex items-end gap-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask a question or share your thoughts..."
            className="flex-1 bg-transparent text-sm resize-none outline-none focus:outline-none max-h-32 text-foreground placeholder-muted-foreground"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${
              message.trim()
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30'
                : 'bg-white/5 text-muted-foreground cursor-not-allowed opacity-50'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground text-center px-4">Press Shift+Enter for new line • Enter to send</p>
    </div>
  );
}
