import styled from "styled-components";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

const Login = () => (
  <Container>
    <FormWrapper>
      <Title>Login</Title>
      <LoginForm />
      <JoinText>
        Don't have an account? <Link to="/signup">Join us today!</Link>
      </JoinText>
    </FormWrapper>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.body};
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: ${({ theme }) => theme.body};
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const JoinText = styled.p`
  margin-top: 20px;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
`;
export default Login;
