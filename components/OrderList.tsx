import { IOrderData } from 'types/api';
import styled from 'styled-components';
import { BlueBtn, RedBtn, Row, SubTitle, Text } from 'styles/styled';

const Container = styled.div`
  width: 360px;
  border: 1px solid ${(props) => props.theme.borderLine};
  border-radius: 15px;
  color: ${(props) => props.theme.textColor};
  box-shadow: 0px 0px 3px ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  padding: 12px;
  margin-bottom: 16px;
`;
const OrderContainer = styled.div`
  overflow-y: auto;
  margin: 16px 0;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  justify-content: space-between;
`;

export default function OrderList({ data }: { data: IOrderData }) {
  return (
    <Container>
      <SubTitle style={{ borderBottom: '1px solid' }}>
        Table No. {data.tableNo}
      </SubTitle>
      <OrderContainer>
        {data.order.map((order) => (
          <Menu key={order.id}>
            <Text>{order.name}</Text>
            <Text>{order.count}개</Text>
          </Menu>
        ))}
      </OrderContainer>
      <Row style={{ marginTop: 'auto' }}>
        <BlueBtn style={{ width: '100%' }}>확인</BlueBtn>
        <RedBtn style={{ width: '100%' }}>취소</RedBtn>
      </Row>
    </Container>
  );
}
