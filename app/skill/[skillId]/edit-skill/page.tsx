// app/skills/[skillId]/edit/page.tsx

import Edit_skill from "@/components/edit-skill/page";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export default async function EditSkillPage({
  params,
}: {
  params: { skillId: string };
}) {
  const { skillId } = params;

  const res = await fetch(`${API_URL}/skills/${skillId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch skill");
  }

  const data = await res.json();
  const skill = data.skills;

  return <Edit_skill skill={skill} />;
}
