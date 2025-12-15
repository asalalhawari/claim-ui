import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "link";
};

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded text-sm font-medium transition";

  const variants = {
    default: "bg-blue-600 text-white px-3 py-1 hover:bg-blue-700",
    link: "text-blue-600 hover:underline p-0",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};
