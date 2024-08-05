import React from "react";

const Button = ({ children, type, disabled, onClick, className }) => {
  return (
    <button
      type={type ? type : "button"} // If type prop is empty, default to "button"
      onClick={onClick}
      disabled={disabled}
      className={`text-white rounded-md bg-gradient-to-r from-blue-300 to-blue-600 hover:from-blue-400 hover:to-blue-700 px-4 py-1`}
    >
      {children}
    </button>
  );
};

export default Button;
