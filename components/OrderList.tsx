import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { BlueBtn, RedBtn, Row, SubTitle, Text } from 'styles/styled';
import { IMutatedError, IMutatedValue, IOrderRequestData } from 'types/api';
import { OrderCancel, OrderCheck } from 'utill/api';
import { Time } from 'utill/utill';
import { orderRequestDataAtom } from 'utill/atoms';

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
  overflow-y: auto;
`;
const OrderContainer = styled.div`
  overflow-y: auto;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
`;
const MenuRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 4px 0;
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const MenuFooter = styled.div`
  margin-top: auto;
`;

export default function OrderList({ data }: { data: IOrderRequestData }) {
  const queryClient = useQueryClient();
  const setSocketOrderData = useSetRecoilState(orderRequestDataAtom);
  const [sum, setSum] = useState<number>(0);
  const orderCheckMutation = useMutation<IMutatedValue, IMutatedError, number>(
    (id) => OrderCheck(id),
    {
      onError: (res) => {
        toast(res.response?.data.message);
      },
      onSuccess: (res) => {
        setSocketOrderData([]);
        queryClient.invalidateQueries('orderData');
        toast(res.message);
      },
    }
  );
  const orderCancelMutation = useMutation<IMutatedValue, IMutatedError, number>(
    (id) => OrderCancel(id),
    {
      onError: (res) => {
        toast(res.response?.data.message);
      },
      onSuccess: (res) => {
        setSocketOrderData([]);
        queryClient.invalidateQueries('orderData');
        toast(res.message);
      },
    }
  );

  const onAdd = (price: number, count: number) => {
    setSum((prev) => prev + price * count);
  };

  useEffect(() => {
    data.orderDetail.map((order) =>
      onAdd(order.productPrice, order.productCount)
    );
  }, []);

  return (
    <Container>
      <MenuRow>
        <SubTitle style={{ borderBottom: '1px solid' }}>
          Table No. {data.tableNo}
        </SubTitle>
        <Text style={{ color: 'gray' }}>{Time(data.createdAt)}</Text>
      </MenuRow>
      <OrderContainer>
        {data.orderDetail.map((order) => (
          <Menu key={order.detailId}>
            <MenuRow>
              <Text>{order.productName}</Text>
              <MenuRow>
                <Text>
                  {order.productPrice.toLocaleString()} X {order.productCount}개
                </Text>
              </MenuRow>
            </MenuRow>
            <Right>
              <Text>
                {(order.productPrice * order.productCount).toLocaleString()} 원
              </Text>
            </Right>
          </Menu>
        ))}
      </OrderContainer>
      <MenuFooter>
        <Right>
          <SubTitle> 총 금액: {sum.toLocaleString()} 원</SubTitle>
        </Right>
        <Row>
          <BlueBtn
            onClick={() => orderCheckMutation.mutate(data.orderId)}
            style={{ width: '100%' }}
          >
            확인
          </BlueBtn>
          <RedBtn
            onClick={() => orderCancelMutation.mutate(data.orderId)}
            style={{ width: '100%' }}
          >
            취소
          </RedBtn>
        </Row>
      </MenuFooter>
    </Container>
  );
}
