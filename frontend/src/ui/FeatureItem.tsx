import { ComponentType } from "react";
import styled from "styled-components";

interface FeatureProps {
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

function FeatureItem({ icon: Icon, title, description }: FeatureProps) {
  return (
    <FeatureCard>
      <FeatureIcon>
        <Icon />
      </FeatureIcon>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureDescription>{description}</FeatureDescription>
    </FeatureCard>
  );
}

const FeatureCard = styled.div`
  cursor: pointer;
  justify-content: center;
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  background-color: ${({ theme }) => theme.body};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  color: ${({ theme }) => theme.primary};

  svg {
    width: 100%;
    height: 100%;
  }
`;

const FeatureTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-top: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-top: 0.5rem;
`;

export default FeatureItem;
