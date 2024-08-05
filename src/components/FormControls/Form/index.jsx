import React from "react";

const Form = ({ children, onSubmit, className, encType }) => {
  return (
    <form className={`${className}`} onSubmit={onSubmit} encType={encType}>
      {children}
    </form>
  );
};

export default Form;
