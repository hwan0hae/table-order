import { useSetRecoilState } from "recoil";
import { io } from "socket.io-client";
import { OrderData } from "types/api";
import { orderDataAtom } from "utill/atoms";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Socket({ children }: Props) {
  const setOrderData = useSetRecoilState<OrderData[]>(orderDataAtom);

  const socket = io("http://localhost:8080");

  socket.on("orderData", (data) => {
    console.log(data);
    setOrderData((prev) => [...prev, data]);
  });

  return <div>{children}</div>;
}
