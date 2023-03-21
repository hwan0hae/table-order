import { useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import { IOrderData } from 'types/api';
import { orderDataAtom } from 'utill/atoms';

type Props = {
  children: React.ReactNode;
};

export default function Socket({ children }: Props) {
  const setOrderData = useSetRecoilState<IOrderData[]>(orderDataAtom);

  const socket = io('http://localhost:8080');

  socket.on('orderData', (data) => {
    console.log(data);
    setOrderData((prev) => [...prev, data]);
  });

  return <>{children}</>;
}
