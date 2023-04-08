import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Text } from 'styles/styled';

interface IPaginationProps {
  totalPage: number;
  p: string;
}
const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;
const ArrowButton = styled.button`
  color: ${(props) => props.theme.textColor};
  font-size: 1.2em;
  margin: 0 10px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.5);
  }
`;
const PageButton = styled.button`
  color: ${(props) => props.theme.textColor};
  margin: 0 2px;
  font-size: 1em;
  width: 2em;
  border: 1px solid ${(props) => props.theme.textColor};
  position: relative;
  cursor: pointer;

  &:hover {
    filter: brightness(0.5);
  }
`;
export default function Pagination({ totalPage, p = '1' }: IPaginationProps) {
  const pageArray = Array.from({ length: 5 }, (v, i) => i + 1);
  const router = useRouter();
  const currentPage = Number(p);
  const firstNum =
    currentPage % 5 === 0
      ? currentPage - 4
      : currentPage - (currentPage % 5) + 1;
  return (
    <Container>
      {currentPage !== 1 ? (
        <ArrowButton
          onClick={() => router.push(`/order/record?p=${currentPage - 1}`)}
        >
          &lt;
        </ArrowButton>
      ) : null}
      {pageArray.map((page, index) => (
        <li key={page}>
          {firstNum + index === currentPage ? (
            <PageButton style={{ borderColor: 'red', top: '-3px' }}>
              {firstNum + index}
            </PageButton>
          ) : firstNum + index > totalPage ? null : (
            <PageButton
              onClick={() => router.push(`/order/record?p=${firstNum + index}`)}
            >
              {firstNum + index}
            </PageButton>
          )}
        </li>
      ))}

      {currentPage !== totalPage ? (
        <ArrowButton
          onClick={() => router.push(`/order/record?p=${currentPage + 1}`)}
        >
          &gt;
        </ArrowButton>
      ) : null}
    </Container>
  );
}
