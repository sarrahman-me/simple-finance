import { IPaymentAccount } from "@/interface/payment_account";
import { cookies } from "next/headers";

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

    const { message, statusCode, data }: IPaymentAccount = await res.json();

    if (statusCode >= 400) {
      return Response.json({ message, statusCode }, { status: statusCode });
    }

    const totalBalance = data.reduce(
      (acc, account) => acc + (Number(account.balance) || 0),
      0
    );

    return Response.json(
      { message, statusCode, totalBalance },
      {
        status: statusCode,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
