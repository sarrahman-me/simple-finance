import { cookies } from "next/headers";

interface responseType {
  message: string;
  statusCode: number;
  data: {
    access_token: string;
    user: {
      name: string;
      username: string;
      email: string;
    };
  };
}

export async function POST(request: Request) {
  const payload = await request.json();
  const cookieStore = cookies();

  try {
    const res = await fetch("http://localhost/user/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const { data, message, statusCode }: responseType = await res.json();

    if (statusCode >= 400) {
      return Response.json({ message, statusCode }, { status: statusCode });
    }

    cookieStore.set("token", data.access_token);
    return Response.json(
      { data, message, statusCode },
      {
        status: statusCode,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
