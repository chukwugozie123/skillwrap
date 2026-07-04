'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, Loader2, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'other';
  content: string;
  timestamp: Date;
  userAvatar?: string;
  senderName?: string;
  senderAvatar?: string;
  isLoading?: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const lastMessageIdRef = useRef<string>('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const playNotificationSound = () => {
    if (!soundEnabled || !audioRef.current) return;
    
    try {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.log('[v0] Could not play notification sound:', err);
      });
    } catch (error) {
      console.log('[v0] Audio playback error:', error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Play notification for new messages from other users
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.id !== lastMessageIdRef.current && lastMessage.type === 'other') {
        playNotificationSound();
      }
      lastMessageIdRef.current = lastMessage.id;
    }
  }, [messages, soundEnabled]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <audio ref={audioRef} src="/notification.mp3" preload="auto" />
      <div className="flex flex-col gap-4 h-full overflow-y-auto px-4 py-4 scroll-smooth scrollbar-hide">
        {/* Sound Toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 text-muted-foreground hover:text-foreground"
            title={soundEnabled ? 'Disable sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {messages.map((message) => (
        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
          <div className={`flex gap-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            {message.type === 'user' && message.userAvatar && (
              <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden border border-indigo-500/30">
                <Image src={message.userAvatar} alt="User" width={32} height={32} className="w-full h-full object-cover" />
              </div>
            )}

            {message.type === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}

            {message.type === 'other' && message.senderAvatar && (
              <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden border border-purple-500/30">
                <Image src={message.senderAvatar} alt={message.senderName || 'User'} width={32} height={32} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Message Bubble */}
            <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
              {/* Sender Name for Other Users */}
              {message.type === 'other' && message.senderName && <p className="text-xs text-muted-foreground mb-1 font-medium">{message.senderName}</p>}

              {/* Message Content */}
              <div
                className={`px-4 py-3 rounded-2xl glass-hover group transition-all duration-300 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-500/30 text-white'
                    : message.type === 'ai'
                      ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/50 glow-effect'
                      : 'bg-white/5 border-white/10'
                }`}
              >
                {message.isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{message.content}</p>
                )}
              </div>

              {/* Timestamp */}
              <p className="text-xs text-muted-foreground mt-1 px-2">{formatTime(message.timestamp)}</p>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
      </div>
    </>
  );
}
