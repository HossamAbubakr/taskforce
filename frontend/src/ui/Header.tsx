import styled from "styled-components";
import Logo from "./Logo";
import Navbar from "./Navbar";

function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Navbar />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 35px;
  height: 60px;
  background-color: ${({ theme }) => theme.background};
  box-shadow: 9px -12px 26px black;
`;
export default Header;
