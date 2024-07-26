import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  cookieStore.delete("token");
  return Response.json(
    { message: "successfully logout" },
    {
      status: 200,
    }
  );
}
