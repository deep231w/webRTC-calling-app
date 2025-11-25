import { cookies } from "next/headers";

export default async function  TestPage() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  console.log("TOKEN FROM SERVER:", token);

  return <div>Test: {token || "NO TOKEN"}</div>;
}
