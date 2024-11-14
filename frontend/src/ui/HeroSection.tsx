import styled from "styled-components";
import HeroImage from "./HeroImage";
import HeroText from "./HeroText";
import Divider from "./Divider";

const HeroContainer = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  justify-content: space-between;
  padding: 4vw 8vw 2vw 8vw;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;
function HeroSection() {
  return (
    <div>
      <HeroContainer>
        <HeroText />
        <HeroImage />
      </HeroContainer>
      <Divider />
    </div>
  );
}

export default HeroSection;
