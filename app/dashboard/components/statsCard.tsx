export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
