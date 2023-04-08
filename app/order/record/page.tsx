'use client';

import OrderTable from 'components/OrderTable';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, HorizontalScrollContainer, Text, Title } from 'styles/styled';
import { IOrderRecordPageData } from 'types/api';
import { getOrderRecord } from 'utill/api';

export default function Record({ searchParams }) {
  const { p } = searchParams;
  const { data, isLoading } = useQuery<IOrderRecordPageData>(
    ['orderRecord', p],
    () => getOrderRecord(p)
  );
  const [pageError, setPageError] = useState<boolean>(false);
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

  useEffect(() => {
    /** totalPage를 넘어갔을때 */
    if (!data) {
      setPageError(true);
    } else {
      setPageError(false);
    }
  }, [data]);

  return (
    <Box>
      <Title>주문 기록</Title>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : pageError ? (
        <Text>페이지가 없습니다. 확인해주세요.</Text>
      ) : (
        <>
          <Text>주문 수: {data?.totalData}</Text>
          <HorizontalScrollContainer>
            {data ? (
              <OrderTable tableHeader={tableHeader} rows={data.orderData} />
            ) : null}
          </HorizontalScrollContainer>
          <Pagination totalPage={data.totalPage} p={p} />
        </>
      )}
    </Box>
  );
}
