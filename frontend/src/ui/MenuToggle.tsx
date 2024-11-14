import styled from "styled-components";
import { useAuth } from "@hooks/useAuth";
import DropdownMenu from "./DropDownMenu";
import MenuItem from "./MenuItem";
import useVisibility from "@hooks/useVisibility";

function MenuToggle() {
  const { isAuthed, signOut } = useAuth();
  const [ref, isVisible, setIsVisible] = useVisibility();

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  return (
    <DropdownContainer ref={ref}>
      <DropdownButton onClick={toggleMenu}>
        {isVisible ? "☷" : "☰"}
      </DropdownButton>
      <DropdownMenu $isopen={isVisible}>
        {isAuthed ? (
          <>
            <MenuItem to="/settings">Settings</MenuItem>
            <MenuItem to="/tasks">Tasks</MenuItem>
            <MenuItem onClick={signOut}>Sign Out</MenuItem>
          </>
        ) : (
          <>
            <MenuItem to="/signin">Sign In</MenuItem>
            <MenuItem to="/signup">Sign Up</MenuItem>
          </>
        )}
      </DropdownMenu>
    </DropdownContainer>
  );
}
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 5px 10px 10px 10px;
  font-size: 21px;
  border: none;
  cursor: pointer;

  &:hover {
    content: "⦀";
    color: ${({ theme }) => theme.secondary};
  }
`;

export default MenuToggle;
