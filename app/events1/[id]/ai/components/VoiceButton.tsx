import { useState, useRef } from "react";
import { Volume2, VolumeX, Loader as Loader2 } from "lucide-react";

interface VoiceButtonProps {
  message: string;
}

export default function VoiceButton({ message }: VoiceButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  function handleSpeak() {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const speech = new SpeechSynthesisUtterance(message);
    speech.rate = 0.95;
    speech.pitch = 1;

    speech.onstart = () => setSpeaking(true);
    speech.onend = () => setSpeaking(false);
    speech.onerror = () => setSpeaking(false);

    utteranceRef.current = speech;
    window.speechSynthesis.speak(speech);
  }

  return (
    <button
      onClick={handleSpeak}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        speaking
          ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-300"
          : "bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30"
      }`}
    >
      {speaking ? (
        <>
          <Loader2 size={12} className="animate-spin" />
          <span>Speaking...</span>
          <VolumeX size={12} />
        </>
      ) : (
        <>
          <Volume2 size={12} />
          <span>Read Aloud</span>
        </>
      )}
    </button>
  );
}
