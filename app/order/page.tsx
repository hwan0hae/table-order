'use client';

import OrderList from 'components/OrderList';
import { useRecoilValue } from 'recoil';
import { Box, HorizontalScrollContainer, Title } from 'styles/styled';
import { IOrderData } from 'types/api';
import { orderDataAtom } from 'utill/atoms';

export default function Order() {
  const orderData = useRecoilValue<IOrderData[]>(orderDataAtom);

  console.log(orderData);
  return (
    <Box style={{ height: '85vh', justifyContent: 'start' }}>
      <Title>주문</Title>

      <HorizontalScrollContainer>
        {orderData.length !== 0 &&
          orderData.map((order, index) => (
            <OrderList key={order.order[0].id} data={order} />
          ))}
      </HorizontalScrollContainer>
    </Box>
  );
}

// 스크롤 오른쪽으로 가고
