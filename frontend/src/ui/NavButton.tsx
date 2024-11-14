import { ReactNode } from "react";
import styled from "styled-components";
import { baseNavItemStyle } from "@styles/sharedStyles";

interface NavButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

function NavButton({ children, onClick }: NavButtonProps) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}
const StyledButton = styled.button`
  ${baseNavItemStyle}
  background: none;
  border: none;
  text-align: left;
`;

export default NavButton;
