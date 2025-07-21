import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...rest
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200 w-full sm:w-auto";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    info: "bg-cyan-500 text-white hover:bg-cyan-600", // added 'info' variant
    none:"bg-white-500 text-red-400 border border-gray-300"
  };

  return (
    <div className={`${className}`}>
      <button
        type={type}
        className={`${baseClasses} ${variantClasses[variant] || ""}`}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
