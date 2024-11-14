import React from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useAuth } from "@hooks/useAuth";
import { signUpSchema } from "@utils/validation/signupSchema";
import { useNavigate } from "react-router-dom";

interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const { isAuthed, signUp } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    const response = await signUp(data);
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
          <FaUser />
        </IconWrapper>
        <Input type="text" placeholder="Username" {...register("name")} />
      </InputGroup>
      {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

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

      <InputGroup>
        <IconWrapper>
          <FaLock />
        </IconWrapper>
        <Input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
      </InputGroup>
      {errors.confirmPassword && (
        <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
      )}

      <Button type="submit">Sign Up</Button>
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
  background: ${({ theme }) => theme.background};
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 0px ${({ theme }) => theme.primary};
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

export default SignUpForm;
