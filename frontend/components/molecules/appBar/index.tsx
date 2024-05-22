"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

const AppBar = ({
  title,
  arrowBack = false,
}: {
  title: string;
  arrowBack?: boolean;
}) => {
  const router = useRouter();

  return (
    <div className="bg-white bg-opacity-50 p-2 z-50 sticky top-0 flex items-center justify-between">
      {arrowBack && (
        <IoMdArrowBack
          onClick={() => router.back()}
          className="cursor-pointer text-xl"
        />
      )}
      <h2 className="text-base md:text-lg font-medium">{title}</h2>
      <div></div>
    </div>
  );
};

export default AppBar;
