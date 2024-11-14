import styled from "styled-components";

function HeroImage() {
  return (
    <HeroImageWrapper>
      <picture>
        <HeroImg
          sizes="(max-width: 1980px) 100vw, 1980px"
          srcSet="
          images/hero/hero-image_ktdwe4_c_scale,w_500.webp 500w,
          images/hero/hero-image_ktdwe4_c_scale,w_905.webp 905w,
          images/hero/hero-image_ktdwe4_c_scale,w_1241.webp 1241w,
          images/hero/hero-image_ktdwe4_c_scale,w_1569.webp 1569w,
          images/hero/hero-image_ktdwe4_c_scale,w_1980.webp 1980w"
          src="images/hero/hero-image_ktdwe4_c_scale,w_1980.webp"
          alt=""
        />
      </picture>
    </HeroImageWrapper>
  );
}

const HeroImageWrapper = styled.div`
  flex: 2;
  text-align: right;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 5vw;
  }
`;

const HeroImg = styled.img`
  max-width: 50vw;
  height: auto;
  object-fit: cover;

  @media (max-width: 768px) {
    max-width: 90vw;
  }
`;
export default HeroImage;
