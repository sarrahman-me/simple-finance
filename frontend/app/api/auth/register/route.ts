interface responseType {
  message: string;
  statusCode: number;
}

export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const res = await fetch("http://localhost/user/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

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
