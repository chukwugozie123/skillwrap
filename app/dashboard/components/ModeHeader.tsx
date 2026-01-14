export default function ModeHeader({ title, subtitle, accent }: any) {
  const map = {
    cyan: "from-cyan-500 to-blue-600",
    purple: "from-purple-600 to-indigo-600",
    blue: "from-blue-600 to-indigo-600",
  };

  return (
    <div
      className={`mb-10 p-6 rounded-3xl bg-gradient-to-r ${map[accent]}
      border border-white/20 shadow-lg`}
    >
      <h2 className="text-3xl font-extrabold">{title}</h2>
      <p className="text-white/80 mt-2">{subtitle}</p>
    </div>
  );
}
