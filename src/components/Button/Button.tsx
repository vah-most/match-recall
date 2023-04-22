import React from "react";

import "./Button.scss";

interface ButtonProps {
  [prop: string]: any;
}

function Button({ children, className, onClick, ...rest }: ButtonProps) {
  return (
    <div className={`buttonContainer ${className}`} onClick={onClick} {...rest}>
      {children}
    </div>
  );
}

export default Button;
