// //  main page component
// import Edit_skill from "@/components/edit-skill/page";
//     interface Props {
//         params: {skillId: string}
//     }

// export default async function Edits({ params }: Props) { 

//     const {skillId} = params

//         const res = await fetch(`http://localhost:5000/skills/${skillId}`, {
//           cache: "no-store",
//         });
//         if (!res.ok) throw new Error("Failed to fetch skill");
//         const data = await res.json();
//         const skill = data.skills

//     return(
//         <>
//         <Edit_skill  skill={skill}/>
//         </>
//     )
// }







// app/skills/[skillId]/edit/page.tsx
import Edit_skill from "@/components/edit-skill/page";

interface Props {
  params: { skillId: string };
}

  // const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  const API_URL = "http://localhost:5000";

export default async function Edits({ params }: Props) {
  const { skillId } = params;

  const res = await fetch(`${API_URL}/skills/${skillId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch skill");

  
  const data = await res.json();
  const skill = data.skills;

  return <Edit_skill skill={skill} />;
}
