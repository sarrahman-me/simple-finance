import { cookies } from "next/headers";

interface responseTypePOST {
  message: string;
  statusCode: number;
  data: {
    account_number: string;
    username: string;
    balance: string;
    name: string;
    updatedAt: string;
    createdAt: string;
  };
}

interface responseTypeGET {
  message: string;
  statusCode: number;
  data: [
    {
      account_number: string;
      name: string;
      balance: string;
      username: string;
      createdAt: string;
      updatedAt: string;
    }[]
  ];
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const { name } = await request.json();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_SERVER}/user/payment-account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      }
    );

    const { message, statusCode }: responseTypePOST = await res.json();

    if (statusCode >= 400) {
      return Response.json({ message, statusCode }, { status: statusCode });
    }

    return Response.json(
      { message, statusCode },
      {
        status: statusCode,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_SERVER}/user/payment-account`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { message, statusCode, data }: responseTypeGET = await res.json();

    if (statusCode >= 400) {
      return Response.json({ message, statusCode }, { status: statusCode });
    }

    return Response.json(
      { message, statusCode, data },
      {
        status: statusCode,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
