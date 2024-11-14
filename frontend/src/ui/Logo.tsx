import styled from "styled-components";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <LogoContainer>
      <Link to="/">
        <picture>
          <img
            alt="Logo"
            sizes="(max-width: 150px) 100vw, 150px"
            srcSet="/images/logo/Logo_s7qxna_c_scale,w_50.webp 50w, /images/logo/Logo_s7qxna_c_scale,w_150.webp 150w"
            src="/images/logo/Logo_s7qxna_c_scale,w_150.webp"
          />
        </picture>
      </Link>
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    display: block;
    height: 40px;
    width: auto;
  }
`;
export default Logo;
