import { ReactNode } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { baseNavItemStyle } from "@styles/sharedStyles";

interface NavLinkProps {
  children: ReactNode;
  to: string;
}

function NavLink({ children, to }: NavLinkProps) {
  return (
    <StyledNavLink
      to={to}
      className={({ isActive }) => (isActive ? "active" : "")}
    >
      {children}
    </StyledNavLink>
  );
}

const StyledNavLink = styled(RouterNavLink)`
  ${baseNavItemStyle}
`;
export default NavLink;
