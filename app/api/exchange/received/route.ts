import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const res = await fetch("http://localhost:5000/exchange/recieved", {
    headers: { Cookie: cookieHeader },
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
