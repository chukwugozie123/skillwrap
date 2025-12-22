import { cookies } from "next/headers";
import EditProfile from "@/components/edit_profile/page"

export default async function EditPage() {


  //  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_URL = 'http://localhost:5000'

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");


  const res = await fetch( `${API_URL}/auth/profile`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return <p>Failed to load page</p>;

  const data = await res.json();

  return (
    <div>
      <EditProfile initialProfile={data.user} />
    </div>
  );
}
