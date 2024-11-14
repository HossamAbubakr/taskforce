import styled from "styled-components";
import NavLink from "./NavLink";
import NavButton from "./NavButton";
import LightToggle from "./LightToggle";
import MenuToggle from "./MenuToggle";
import { useAuth } from "@hooks/useAuth";

function Navbar() {
  const { isAuthed, signOut } = useAuth();
  return (
    <Nav>
      <ResponsiveContainer $showOnMobile={false}>
        {isAuthed ? (
          <>
            <NavLink to="/settings">Settings</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavButton onClick={signOut}>Sign Out</NavButton>
          </>
        ) : (
          <>
            <NavLink to="/login">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </ResponsiveContainer>
      <LightToggle />
      <ResponsiveContainer $showOnMobile={true}>
        <MenuToggle />
      </ResponsiveContainer>
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ResponsiveContainer = styled.div<{ $showOnMobile?: boolean }>`
  display: ${({ $showOnMobile }) => ($showOnMobile ? "flex" : "none")};
  @media (min-width: 768px) {
    display: ${({ $showOnMobile }) => ($showOnMobile ? "none" : "flex")};
    align-items: center;
    margin-right: ${({ $showOnMobile }) => ($showOnMobile ? "0" : "30px")};
    gap: 10px;
  }
`;
export default Navbar;
