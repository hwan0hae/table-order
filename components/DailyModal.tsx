import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import {
  Box,
  TableDetailModal as DailyDetailModal,
  OrderBox,
  OrderList,
  Overlay,
  Right,
  SubTitle,
  Text,
  Title,
} from 'styles/styled';
import { IGetDailySalesData } from 'types/api';
import { IDailyModalProps } from 'types/data';
import { getDailySales } from 'utill/api';
import { Menu, MenuRow } from './OrderList';

export default function DailyModal({
  year,
  month,
  day,
  setDay,
}: IDailyModalProps) {
  const ModalRef = useRef<HTMLDivElement>(null);
  const [sum, setSum] = useState<number>(0);
  const { data, isLoading } = useQuery<IGetDailySalesData[]>('dailySales', () =>
    getDailySales(year, month, day)
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ModalRef.current && !ModalRef.current.contains(e.target as Node)) {
        setSum(0);
        setDay(null);
      }
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [ModalRef]);

  useEffect(() => {
    setSum(0);
    if (data) {
      data.map((order) => {
        setSum((prev) => prev + order.productPrice * order.productCount);
      });
    }
  }, [data]);
  return (
    <AnimatePresence>
      <Overlay>
        <DailyDetailModal ref={ModalRef}>
          <Box>
            <Title>
              {year}년 {month}월 {day}일 매출 현황
            </Title>

            {isLoading ? null : (
              <>
                <OrderList>
                  {data?.map((order) => (
                    <OrderBox key={order.productId}>
                      <Menu>
                        <MenuRow>
                          <Text>{order.productName}</Text>
                          <MenuRow>
                            <Text>
                              {order.productPrice.toLocaleString()} X{' '}
                              {order.productCount}개
                            </Text>
                          </MenuRow>
                        </MenuRow>
                        <Right>
                          <Text>
                            {(
                              order.productPrice * order.productCount
                            ).toLocaleString()}{' '}
                            원
                          </Text>
                        </Right>
                      </Menu>
                    </OrderBox>
                  ))}
                </OrderList>
                <Right>
                  <SubTitle>
                    {' '}
                    총 금액: {sum.toLocaleString('ko-kr')} 원
                  </SubTitle>
                </Right>
              </>
            )}
          </Box>
        </DailyDetailModal>
      </Overlay>
    </AnimatePresence>
  );
}
