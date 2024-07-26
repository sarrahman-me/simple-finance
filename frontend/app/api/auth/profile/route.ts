import { cookies } from "next/headers";

interface responseType {
  message: string;
  statusCode: number;
  data?: {
    name: string;
    username: string;
    email: string;
    iat: number;
    exp: number;
  };
}

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_SERVER}/user/auth/profile`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    }
  );

  const data: responseType = await res.json();

  return Response.json(data, {
    status: data.statusCode,
  });
}
