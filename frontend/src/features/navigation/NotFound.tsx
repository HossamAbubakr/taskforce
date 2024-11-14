import styled from "styled-components";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Container>
      <Title>404</Title>
      <Description>
        Sorry, the page you are looking for does not exist.
      </Description>
      <HomeLink to="/">Go Home</HomeLink>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const HomeLink = styled(Link)`
  padding: 10px 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
  }
`;

export default NotFoundPage;
