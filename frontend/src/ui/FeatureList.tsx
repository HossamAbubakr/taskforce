import styled from "styled-components";
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlusCircle,
  AiOutlineSearch,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import FeatureItem from "./FeatureItem";

const features = [
  {
    icon: AiOutlineUnorderedList,
    title: "Task List",
    description:
      "Display a detailed list of tasks including title, description, status, and due date.",
  },
  {
    icon: AiOutlineSearch,
    title: "Task Filtering",
    description:
      "Filter tasks efficiently by status, due date, or perform a search by title or description.",
  },
  {
    icon: AiOutlinePlusCircle,
    title: "Add New Tasks",
    description:
      "Easily add new tasks to your list to stay well organized and on top of your schedule.",
  },
  {
    icon: AiOutlineEdit,
    title: "Edit Tasks",
    description:
      "Edit existing tasks seamlessly to ensure your task list stays accurate and updated.",
  },
  {
    icon: AiOutlineDelete,
    title: "Delete Tasks",
    description:
      "Remove unnecessary tasks from your list to keep it clean and focused on current tasks.",
  },
  {
    icon: AiOutlineCheckCircle,
    title: "Mark as Complete",
    description:
      "Mark tasks as complete or reopen them if needed to track your progress effectively.",
  },
];

function FeaturesList() {
  return (
    <>
      <Section>
        <Container>
          <Header>Some Of Our Features</Header>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </FeaturesGrid>
        </Container>
      </Section>
    </>
  );
}

const Section = styled.section`
  padding: 7rem 2rem 2rem 2rem;
  border-radius: 25px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
`;

const Container = styled.div`
  margin-top: 5vh;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 70%)`};
  background-clip: text;
  color: transparent;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 3rem;
  @media (max-width: 768px) {
    font-size: 6vw;
  }

  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

const FeaturesGrid = styled.div`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

export default FeaturesList;
