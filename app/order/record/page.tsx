'use client';

import OrderTable from 'components/OrderTable';
import { useQuery } from 'react-query';
import { Box, HorizontalScrollContainer, Text, Title } from 'styles/styled';
import { IOrderRecordData } from 'types/api';
import { getOrderRecord } from 'utill/api';

export default function Record() {
  const { data, isLoading } = useQuery<IOrderRecordData[]>(
    'orderRecord',
    getOrderRecord
  );
  console.log(data);
  const tableHeader = [
    {
      accessor: 'no',
      value: 'No',
    },
    {
      accessor: 'tableNo',
      value: '테이블 번호',
    },
    {
      accessor: 'orderDetail',
      value: '주문',
    },
    {
      accessor: 'orderStatus',
      value: '주문 상태',
    },
    {
      accessor: 'createdAt',
      value: '주문 시간',
    },
    {
      accessor: 'modifiedAt',
      value: '처리 시간',
    },
  ];

  return (
    <Box>
      <Title>주문 기록</Title>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>주문 수: {data.length}</Text>
          <HorizontalScrollContainer>
            <OrderTable tableHeader={tableHeader} rows={data} />
          </HorizontalScrollContainer>
        </>
      )}
    </Box>
  );
}
