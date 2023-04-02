'use client';

import OrderList from 'components/OrderList';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Box, HorizontalScrollContainer, Text, Title } from 'styles/styled';
import { IOrderRequestData } from 'types/api';
import { getOrderRequest } from 'utill/api';
import { orderNotificationAtom, orderRequestDataAtom } from 'utill/atoms';

export default function Order() {
  const { data, isLoading } = useQuery<IOrderRequestData[]>(
    'orderData',
    getOrderRequest,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const socketOrderData =
    useRecoilValue<IOrderRequestData[]>(orderRequestDataAtom);
  const setOrderNotification = useSetRecoilState<boolean>(
    orderNotificationAtom
  );
  useEffect(() => {
    setOrderNotification(false);
  }, []);
  return (
    <Box style={{ height: '85vh', justifyContent: 'start' }}>
      <Title>주문</Title>

      <HorizontalScrollContainer>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : data.length !== 0 ? (
          <>
            {data?.map((order) => (
              <OrderList key={order.orderId} data={order} />
            ))}
            {socketOrderData.length !== 0 ? (
              <>
                {socketOrderData.map((order) => (
                  <OrderList key={order.orderId} data={order} />
                ))}
              </>
            ) : null}
          </>
        ) : (
          <>
            {socketOrderData.length !== 0 ? (
              <>
                {socketOrderData.map((order) => (
                  <OrderList key={order.orderId} data={order} />
                ))}
              </>
            ) : null}
          </>
        )}
      </HorizontalScrollContainer>
    </Box>
  );
}
