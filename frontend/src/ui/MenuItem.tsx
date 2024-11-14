import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
}

function MenuItem({ to, children, onClick }: MenuItemProps) {
  return to ? (
    <StyledLink to={to}>{children}</StyledLink>
  ) : (
    <StyledButton onClick={onClick}>{children}</StyledButton>
  );
}

const BaseMenuItemStyle = css`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const StyledLink = styled(Link)`
  ${BaseMenuItemStyle}
`;

const StyledButton = styled.button`
  ${BaseMenuItemStyle}
  background: none;
  border: none;
  text-align: left;
`;
export default MenuItem;
