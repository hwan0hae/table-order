import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  BlueBtn,
  Box,
  Btn,
  Overlay,
  Right,
  Row,
  SubTitle,
  TableDetailModal,
  Text,
  Title,
} from 'styles/styled';
import { ITableModalProps } from 'types/data';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTableDetail, tablePayment } from 'utill/api';
import { IGetTableDetailData, IMutatedError, IMutatedValue } from 'types/api';
import { Menu, MenuRow } from './OrderList';
import styled from 'styled-components';
import { ModalScrollPrevent, Time } from 'utill/utill';
import { toast } from 'react-hot-toast';

const OrderList = styled.div`
  width: 100%;
`;
const OrderBox = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderLine};
  width: 100%;
  padding: 0 12px;
  margin-bottom: 6px;
`;

export default function TableModal({
  tableData: { tableId, tableNo },
  setTableModalVisible,
}: ITableModalProps) {
  const queryClient = useQueryClient();
  const ModalRef = useRef<HTMLDivElement>(null);
  const [sum, setSum] = useState<number>(0);
  const { data, isLoading } = useQuery<IGetTableDetailData[]>(
    'tableDetail',
    () => getTableDetail(tableId)
  );
  const usePaymentMutation = useMutation<IMutatedValue, IMutatedError, number>(
    (tableId) => tablePayment(tableId),
    {
      onError: (res) => {
        toast.error(res.response?.data.message);
      },
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries('table');
        setSum(0);
        setTableModalVisible(false);
      },
    }
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ModalRef.current && !ModalRef.current.contains(e.target as Node)) {
        setTableModalVisible(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [ModalRef]);

  const onAdd = (price: number, count: number) => {
    setSum((prev) => prev + price * count);
  };

  useEffect(() => {
    data?.map((order) =>
      order.orderDetail.map((detail) =>
        onAdd(detail.productPrice, detail.productCount)
      )
    );
  }, [data]);

  ModalScrollPrevent();
  return (
    <AnimatePresence>
      <Overlay>
        <TableDetailModal
          ref={ModalRef}
          style={{ maxHeight: '850px', overflow: 'auto' }}
        >
          <Box>
            <Title>{tableNo}번 테이블</Title>
            {isLoading ? (
              <Text> Loading...</Text>
            ) : (
              <OrderList>
                {data?.map((order) => (
                  <OrderBox key={order.orderId}>
                    <Text
                      style={{ borderBottom: '1px solid', marginRight: '12px' }}
                    >
                      주문번호. {order.orderId}
                    </Text>

                    <Text style={{ color: 'gray' }}>
                      {Time(order.modifiedAt)}
                    </Text>
                    {order.orderDetail.map((detail) => (
                      <Menu key={detail.detailId}>
                        <MenuRow>
                          <Text>{detail.productName}</Text>
                          <MenuRow>
                            <Text>
                              {detail.productPrice.toLocaleString()} X{' '}
                              {detail.productCount}개
                            </Text>
                          </MenuRow>
                        </MenuRow>
                        <Right>
                          <Text>
                            {(
                              detail.productPrice * detail.productCount
                            ).toLocaleString()}{' '}
                            원
                          </Text>
                        </Right>
                      </Menu>
                    ))}
                  </OrderBox>
                ))}
              </OrderList>
            )}
            <Right>
              <SubTitle> 총 금액: {sum.toLocaleString()} 원</SubTitle>
            </Right>
            <Row>
              <BlueBtn onClick={() => usePaymentMutation.mutate(tableId)}>
                결제하기
              </BlueBtn>
              <Btn onClick={() => setTableModalVisible(false)}>닫기</Btn>
            </Row>
          </Box>
        </TableDetailModal>
      </Overlay>
    </AnimatePresence>
  );
}
