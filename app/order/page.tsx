"use client";
import OrderList from "components/OrderList";
import { Box, HorizontalScrollContainer, Title } from "styles/styled";
import { OrderData } from "types/api";

export default function Order() {
  const orderData: OrderData[] = [
    {
      tableNo: 1,
      order: [
        {
          id: 123,
          name: "김치",
          price: "1000",
          description: "김치김치",
          imageUrl: "",
          count: 3,
        },
        {
          id: 122,
          name: "사이다",
          price: "2000",
          description: "사이사이",
          imageUrl: "",
          count: 2,
        },
      ],
    },
    {
      tableNo: 2,
      order: [
        {
          id: 1234,
          name: "콜라",
          price: "3000",
          description: "콜콜",
          imageUrl: "",
          count: 7,
        },
        {
          id: 122,
          name: "사이다",
          price: "2000",
          description: "사이사이",
          imageUrl: "",
          count: 5,
        },
      ],
    },
    {
      tableNo: 3,
      order: [
        {
          id: 1234,
          name: "콜라",
          price: "3000",
          description: "콜콜",
          imageUrl: "",
          count: 1,
        },
        {
          id: 122,
          name: "사이다",
          price: "2000",
          description: "사이사이",
          imageUrl: "",
          count: 1,
        },
        {
          id: 123,
          name: "김치",
          price: "1000",
          description: "김치김치",
          imageUrl: "",
          count: 1,
        },
      ],
    },
  ];

  return (
    <Box style={{ height: "85vh", justifyContent: "start" }}>
      <Title>주문</Title>

      <HorizontalScrollContainer>
        {orderData &&
          orderData.map((order, index) => (
            <OrderList key={index} data={order} />
          ))}
      </HorizontalScrollContainer>
    </Box>
  );
}

//스크롤 오른쪽으로 가고
