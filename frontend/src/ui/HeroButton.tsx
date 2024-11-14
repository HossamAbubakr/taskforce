import { ReactNode } from "react";
import styled from "styled-components";

function HeroButton({ children }: { children: ReactNode }) {
  return <HeroButtonStyle>{children}</HeroButtonStyle>;
}
const HeroButtonStyle = styled.button`
  width: 10.5em;
  height: 3.5em;
  margin: 2em 0;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 70%)`};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease, 0.3s ease, opacity 0.3s ease;

  &:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }
`;

export default HeroButton;
