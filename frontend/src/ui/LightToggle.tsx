import styled, { keyframes } from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@contexts/themeContext";

function LightToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme}>
      {isDarkMode ? <FaMoon color="yellow" /> : <FaSun color="orange" />}
    </ToggleButton>
  );
}

const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  outline: none;

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.5s;
  }

  &:hover svg {
    animation: ${rotate} 0.5s linear;
  }
`;
export default LightToggle;
