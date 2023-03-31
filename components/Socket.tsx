import { useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import { IOrderRequestData } from 'types/api';
import { orderRequestDataAtom } from 'utill/atoms';

type Props = {
  children: React.ReactNode;
};

export default function Socket({ children }: Props) {
  const setOrderData =
    useSetRecoilState<IOrderRequestData[]>(orderRequestDataAtom);

  const socket = io('http://localhost:8080');

  socket.on('orderData', (data) => {
    console.log(data);
    setOrderData((prev) => [...prev, data]);
  });

  return <>{children}</>;
}
