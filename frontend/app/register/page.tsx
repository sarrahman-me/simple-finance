"use client";
import { Button, Textfield } from "@/components/atoms";
import { TemplateAuth } from "@/components/template";
import { useRouter } from "next/navigation";
import { Loading } from "notiflix";
import { FormEvent, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Loading.standard({
      svgColor: "#0284c7",
    });

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.statusCode < 400) {
      router.push("/login");
      Loading.remove();
      return;
    }

    Loading.remove();
    alert(data.message);
  };

  return (
    <TemplateAuth>
      <div className="space-y-8">
        <h2 className="text-lg text-primary-600 font-bold">Register :</h2>
        <form onSubmit={handleRegister} className="space-y-3">
          <Textfield
            label="Name"
            placeholder="e.g Jhon Doe"
            onChange={(v) => setPayload({ ...payload, name: v })}
          />
          <Textfield
            type="email"
            label="Email"
            placeholder="example@email.com"
            onChange={(v) => setPayload({ ...payload, email: v })}
          />
          <Textfield
            type="password"
            label="Password"
            placeholder="* * * * * *"
            onChange={(v) => setPayload({ ...payload, password: v })}
          />
          <Button
            disabled={!payload.email || !payload.name || !payload.password}
            fullWidth
            type="submit"
          >
            Register
          </Button>
        </form>
        <p className="text-sm text-gray-500 text-center">
          already have an account.{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-primary-600 cursor-pointer"
          >
            login
          </span>
        </p>
      </div>
    </TemplateAuth>
  );
}
