import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { ProductData } from "types/api";

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
const Image = styled.img`
  top: -50px;
  position: relative;
  margin: 0 auto;
  width: 150px;
  height: 150px;
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

export default function Product({
  id,
  name,
  price,
  description,
  imageUrl,
}: ProductData) {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/${id}`}>
      <Container>
        <Image src={imageUrl} alt={`${name} 이미지`} />
        <Content>
          <Title>{name}</Title>
          <Description>{description}</Description>
          <Price> {price}원</Price>
        </Content>
      </Container>
    </Link>
  );
}
