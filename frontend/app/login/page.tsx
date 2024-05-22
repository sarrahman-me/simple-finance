"use client";
import { Button, Textfield } from "@/components/atoms";
import { TemplateAuth } from "@/components/template";
import { useRouter } from "next/navigation";
import { Loading, Notify } from "notiflix";
import { FormEvent, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Loading.standard({
      svgColor: "#0284c7",
    });

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.statusCode < 400) {
      Notify.success(data.message);
      router.push("/dashboard");
      Loading.remove();
      return;
    }

    Loading.remove();
    Notify.failure(data.message);
  };

  return (
    <TemplateAuth>
      <div className="space-y-10">
        <h2 className="text-lg text-primary-600 font-bold">Login :</h2>
        <form onSubmit={handleLogin} className="space-y-3">
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
            disabled={!payload.email || !payload.password}
            fullWidth
            type="submit"
          >
            Login
          </Button>
        </form>
        <p className="text-sm text-gray-500 text-center">
          dont have an account yet.{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-primary-600 cursor-pointer"
          >
            register
          </span>
        </p>
      </div>
    </TemplateAuth>
  );
}
