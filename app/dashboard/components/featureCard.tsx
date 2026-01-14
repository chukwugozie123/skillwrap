import Link from "next/link";

export default function FeatureCard({ title, desc, href, icon }: any) {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl">
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/80 text-sm mb-6">{desc}</p>
      <Link href={href} className="px-4 py-2 bg-black/30 rounded-lg">
        Explore →
      </Link>
    </div>
  );
}
