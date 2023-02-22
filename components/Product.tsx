import Image from "next/image";
import styled from "styled-components";

const Container = styled.article`
  width: 230px;
  height: 360px;
  border: 1px solid ${(props) => props.theme.borderLine};
  border-radius: 5%;
  margin-top: 60px;
  color: ${(props) => props.theme.textColor};
  box-shadow: 0px 0px 5px 1px ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  padding: 0 12px 12px 12px;
  transition: scale 0.2s ease-in-out;
  position: relative;
  cursor: pointer;
  &:hover {
    scale: 1.05;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -25px;
  height: calc(100% - 150px);
`;
const Title = styled.h3`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  font-size: 1.7rem;
`;

const Description = styled.pre`
  color: ${(props) => props.theme.textColor};
  font-weight: 400;
  font-size: 1rem;
`;
const Price = styled.span`
  color: ${(props) => props.theme.textColor};
  font-weight: 400;
  font-size: 1.2rem;
  position: relative;
  margin-left: auto;
  margin-top: auto;
`;

interface IPost {
  name: string;
  price: string | null;
  description: string | null;
  imageUrl: string | null;
}
export default function Product({ name, price, description, imageUrl }: IPost) {
  console.log(imageUrl);
  return (
    <Container>
      <Image
        src={""}
        alt={`${name} 이미지`}
        width={150}
        height={150}
        style={{
          backgroundColor: "red",
          top: "-50px",
          position: "relative",
          margin: "0 auto",
        }}
      />
      <Content>
        <Title>{name}</Title>
        <Description>{description}</Description>
        <Price> {price}원</Price>
      </Content>
    </Container>
  );
}
