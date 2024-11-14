import styled from "styled-components";
import HeroButton from "./HeroButton";

function HeroText() {
  return (
    <HeroTextWrapper>
      <HeroStyledText>Get organized, get productive</HeroStyledText>
      <SubText>
        With Taskforce, you can get things done quicker and more efficiently
        using our user friendly interface to track your tasks.
      </SubText>
      <HeroButton>Give it a spin!</HeroButton>
    </HeroTextWrapper>
  );
}

const HeroTextWrapper = styled.div`
  flex: 1;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const HeroStyledText = styled.h1`
  color: ${({ theme }) => theme.primary};
  font-size: 4rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 70%)`};
  background-clip: text;
  color: transparent;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 6vw;
  }

  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

const SubText = styled.p`
  font-size: 1.3rem;
  margin: 10px 0 0;
  padding: 0;
`;
export default HeroText;
