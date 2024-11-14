import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <>
      <FooterContainer>
        <SocialLinks>
          <a
            href="https://github.com/hossamabubakr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/hossamabubakr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </SocialLinks>
        <FooterText>Made by Hossam Abubakr &copy; 2024</FooterText>
      </FooterContainer>
    </>
  );
}

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 1rem 0;
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  a {
    color: ${({ theme }) => theme.text};
    margin: 0 1rem;
    font-size: 1.5rem;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const FooterText = styled.p`
  margin: 0;
`;

export default Footer;
