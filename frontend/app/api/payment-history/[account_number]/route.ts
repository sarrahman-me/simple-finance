import { cookies } from "next/headers";

interface responseType {
  message: string;
  statusCode: number;
  data: {
    id: number;
    amount: string;
    status: string;
    type: string;
    id_transaction: string;
    account_number: string;
    createdAt: string;
    updatedAt: string;
  }[];
  metadata: {
    limit: number;
    page: number;
    totalData: number;
    totalPages: number;
  };
}

export async function GET(
  req: Request,
  { params }: { params: { account_number: string } }
) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_SERVER}/user/history-account/${params.account_number}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { message, statusCode, data }: responseType = await res.json();

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
