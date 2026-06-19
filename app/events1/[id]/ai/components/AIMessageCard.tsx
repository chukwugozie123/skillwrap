import { motion } from "framer-motion";
import { BookOpen, CircleHelp as HelpCircle, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, User, GraduationCap } from "lucide-react";
import VoiceButton from "./VoiceButton";

export interface Message {
  type: string;
  message: string;
  sender?: string;
}

const TYPE_STYLES: Record<string, { bg: string; border: string; icon: typeof BookOpen; iconColor: string; label: string }> = {
  lesson: {
    bg: "from-indigo-500/15 to-blue-500/10",
    border: "border-indigo-500/30",
    icon: BookOpen,
    iconColor: "text-indigo-400",
    label: "Lesson",
  },
  question: {
    bg: "from-yellow-500/15 to-amber-500/10",
    border: "border-yellow-500/30",
    icon: HelpCircle,
    iconColor: "text-yellow-400",
    label: "Question",
  },
  feedback: {
    bg: "from-green-500/15 to-emerald-500/10",
    border: "border-green-500/30",
    icon: CheckCircle2,
    iconColor: "text-green-400",
    label: "Feedback",
  },
  error: {
    bg: "from-red-500/15 to-rose-500/10",
    border: "border-red-500/30",
    icon: AlertCircle,
    iconColor: "text-red-400",
    label: "Error",
  },
  reply: {
    bg: "from-cyan-500/15 to-blue-500/10",
    border: "border-cyan-500/20",
    icon: GraduationCap,
    iconColor: "text-cyan-400",
    label: "AI Tutor",
  },
};

function getTypeStyle(type: string) {
  return TYPE_STYLES[type] || TYPE_STYLES.reply;
}

export default function AIMessageCard({ msg, index }: { msg: Message; index: number }) {
  const isUser = msg.sender === "user";
  const style = getTypeStyle(msg.type);
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.015, 0.3) }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[90%] sm:max-w-[80%] md:max-w-[70%] rounded-xl overflow-hidden ${
          isUser
            ? "bg-gradient-to-br from-blue-600/80 to-indigo-600/80 border border-blue-400/30"
            : `bg-gradient-to-br ${style.bg} border ${style.border} glass`
        }`}
      >
        <div className="px-3 py-2.5 space-y-1.5">
          {/* Header */}
          <div className="flex items-center gap-1.5 text-[10px]">
            {isUser ? (
              <>
                <User size={10} className="text-blue-300" />
                <span className="text-blue-200 font-medium">You</span>
              </>
            ) : (
              <>
                <Icon size={10} className={style.iconColor} />
                <span className={`${style.iconColor} font-medium`}>{style.label}</span>
              </>
            )}
          </div>

          {/* Content */}
          <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed text-gray-100">
            {msg.message}
          </p>

          {/* Voice button for AI messages */}
          {!isUser && <VoiceButton message={msg.message} />}
        </div>
      </div>
    </motion.div>
  );
}
