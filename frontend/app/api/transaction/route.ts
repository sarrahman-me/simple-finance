import { cookies } from "next/headers";

interface responseType {
  message: string;
  statusCode: number;
  data: {
    transaction: {
      id_transaction: string;
      amount: number;
      status: string;
      currency: string;
      description: string;
      from_address: string;
      to_address: string;
      timestamp: string;
      createdAt: string;
      updatedAt: string;
    };
    from: {
      account_number: string;
      name: string;
      pic: string;
    };
    to: {
      account_number: string;
      name: string;
      pic: string;
    };
  };
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const { amount, currency, description, from_address, to_address } =
    await request.json();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_SERVER}/user/payment-account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          description,
          from_address,
          to_address,
        }),
      }
    );

    const { message, statusCode }: responseType = await res.json();

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
