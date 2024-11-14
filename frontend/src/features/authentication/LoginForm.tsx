import React from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { useAuth } from "@hooks/useAuth";
import { loginSchema } from "@utils/validation/loginSchema";
import { useNavigate } from "react-router-dom";
interface LoginFormInputs {
  email: string;
  password: string;
}
const LoginForm: React.FC = () => {
  const { isAuthed, signIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const response = await signIn(data.email, data.password);
    if (response?.status === "success") {
      navigate("/");
    }
  };

  if (isAuthed) {
    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <IconWrapper>
          <FaEnvelope />
        </IconWrapper>
        <Input type="email" placeholder="Email" {...register("email")} />
      </InputGroup>
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      <InputGroup>
        <IconWrapper>
          <FaLock />
        </IconWrapper>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
      </InputGroup>
      {errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}
      <Button type="submit">Login</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background: ${({ theme }) => theme.body};
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const IconWrapper = styled.div`
  padding: 10px;
  background: ${({ theme }) => theme.secondary};
  border-radius: 4px 0 0 4px;
  color: #fff;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 0 4px 4px 0;
  color: ${({ theme }) => theme.text};
  outline: none;

  &:focus {
    border: 1px solid ${({ theme }) => theme.secondary};
  }
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

export default LoginForm;
