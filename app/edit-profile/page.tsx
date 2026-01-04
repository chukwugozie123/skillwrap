import EditProfile from "@/components/edit_profile/page";

export default async function EditPage() {
  const API_URL = "https://skillwrap-backend.onrender.com";

  const res = await fetch(`${API_URL}/auth/profile`, {
     credentials: "include",
    cache: "no-store",
  });


  if (!res.ok) {
    return <p>Failed to load page</p>;
  }


  const data = await res.json();
  console.log(data, 'info')

  return (
    <div>
      <EditProfile initialProfile={data.user} />
    </div>
  );
}
