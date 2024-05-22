"use client";
import { Report } from "notiflix";
import { useEffect } from "react";

const Authorization = ({ children }: { children: any }) => {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/auth/profile`);

      const data = await res.json();

      if (data.statusCode !== 200) {
        // Jika sudah mencoba reload dan status masih bukan 200
        Report.warning(
          "Sesi anda berakhir",
          "Silahkan lakukan masuk ulang untuk tetap mengakses dashboard",
          "Okay",
          async () => {
            await fetch("/api/auth/logout", {
              method: "POST",
            });

            window.location.reload();
          }
        );
      } else {
        // Jika status adalah 200, lanjutkan seperti biasa
      }
    }
    fetchData();
  }, []);

  return <div>{children}</div>;
};

export default Authorization;
