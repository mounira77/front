//import { useEffect } from "react";
import "./button.scss";

const Button = (props) => {
  const { handelClick, text, type, color, disabled } = props;

  return (
    <button
      type={type || "button"}
      // disabled={disabled}
      className="button"
      onClick={handelClick}
    >
      {text}
    </button>
  );
};

export default Button;
