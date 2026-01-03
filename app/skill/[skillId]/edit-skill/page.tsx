// // app/skill/[skillId]/edit-skill/page.tsx

// import Edit_skill from "@/components/edit-skill/page";

// // const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
//  const API_URL= 'https://skillwrap-backend.onrender.com'

// export default async function EditSkillPage({
//   params,
// }: {
//   params: Promise<{ skillId: string }>;
// }) {
//   // ✅ MUST await params in new Next versions
//   const { skillId } = await params;

//   const res = await fetch(`${API_URL}/skills/${skillId}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch skill");
//   }

//   const data = await res.json();
//   const skill = data.skills;

//   return <Edit_skill skill={skill} />;
// }




import EditSkill from "@/components/edit-skill/page";

export default function EditSkillPage() {
  return <EditSkill />;
}



