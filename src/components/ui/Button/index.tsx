import React from "react";
import { StyledButton } from "./styles";
import { FaSpinner } from "react-icons/fa";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button: React.FC<IProps> = (props: IProps) => {
  const { type = "button", children, isLoading, disabled, ...rest } = props;

  return (
    <StyledButton type={type} disabled={isLoading ? isLoading : disabled} {...rest}>
      {isLoading && <FaSpinner />}

      <div style={{ opacity: isLoading ? 0 : 1 }}>{children}</div>
    </StyledButton>
  );
};

export default Button;
