import React from "react";

interface buttonProps {
  children?: React.ReactNode;
  type?: "button" | "reset" | "submit";
  icon?: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  variant?: "contained" | "outlined";
  disabled?: boolean;
  color?: "primary" | "secondary" | "red" | "orange" | "blue";
  size?: "standart" | "small";
}

const Button = ({
  children,
  disabled,
  type = "button",
  icon,
  onClick,
  variant = "contained",
  fullWidth = false,
  color = "primary",
  size = "standart",
}: buttonProps) => {
  const colorStyle: Record<string, { contained: string; outlined: string }> = {
    primary: {
      contained:
        "bg-primary-600 hover:bg-primary-700 text-white disabled:bg-gray-400",
      outlined:
        "border-primary-600 text-primary-500 bg-transparent disabled:bg-gray-100 disabled:border-gray-300",
    },
    secondary: {
      contained:
        "bg-grey-600 hover:bg-grey-700 text-white disabled:bg-gray-400",
      outlined:
        "border-grey-600 text-grey-500 bg-transparent disabled:bg-gray-100 disabled:border-gray-300",
    },
    red: {
      contained: "bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400",
      outlined:
        "border-red-600 text-red-500 bg-transparent disabled:bg-gray-100 disabled:border-gray-300",
    },
    orange: {
      contained:
        "bg-orange-600 hover:bg-orange-700 text-white disabled:bg-gray-400",
      outlined:
        "border-orange-600 text-orange-500 bg-transparent disabled:bg-gray-100 disabled:border-gray-300",
    },
    blue: {
      contained:
        "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400",
      outlined:
        "border-blue-600 text-blue-500 bg-transparent disabled:bg-gray-100 disabled:border-gray-300",
    },
  };

  const variantStyle: Record<string, string> = {
    contained: `${colorStyle[color].contained}`,
    outlined: `${colorStyle[color].outlined} border hover:shadow-md`,
  };

  const sizeClass: Record<string, string> = {
    standart: "p-1.5 md:p-2 text-sm",
    small: "p-1 md:p-1.5 text-sm",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`flex justify-center items-center outline-none ${
        sizeClass[size]
      } rounded-md disabled:cursor-not-allowed ${variantStyle[variant]} ${
        fullWidth && "w-full"
      }`}
    >
      {icon && (
        <span className={`${children ? "mr-1" : ""} text-lg`}>{icon}</span>
      )}
      <p>{children}</p>
    </button>
  );
};

export default Button;
