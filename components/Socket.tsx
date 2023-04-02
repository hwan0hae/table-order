import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { io, Socket as SocketType } from 'socket.io-client';
import { IOrderRequestData, ISessionUserData } from 'types/api';
import { useSessionStorage } from 'usehooks-ts';
import { orderNotificationAtom, orderRequestDataAtom } from 'utill/atoms';
import { useDidMountEffect } from 'utill/utill';

type Props = {
  children: React.ReactNode;
};

export default function Socket({ children }: Props) {
  const path = usePathname();
  const [user, setUser] = useSessionStorage<ISessionUserData>(
    'user',
    undefined
  );
  const [socket, setSocket] = useState<SocketType>();
  const [connected, setConnected] = useState<boolean>(false);
  const [orderData, setOrderData] =
    useRecoilState<IOrderRequestData[]>(orderRequestDataAtom);
  const setOrderNotification = useSetRecoilState<boolean>(
    orderNotificationAtom
  );

  useEffect(() => {
    if (user) {
      const socketIo = io('http://localhost:8080');
      setSocket(socketIo);
      setConnected(true);

      socketIo.on('orderData', (data) => {
        setOrderData((prev) => [...prev, data]);
      });
    }
  }, []);

  useDidMountEffect(() => {
    if (path !== '/order') {
      setOrderNotification(true);
    } else {
      setOrderNotification(false);
    }
  }, [orderData]);

  useDidMountEffect(() => {
    if (user && !connected) {
      const socketIo = io('http://localhost:8080');
      setSocket(socketIo);
      setConnected(true);

      socketIo.on('orderData', (data) => {
        setOrderData((prev) => [...prev, data]);
      });
    } else if (!user) {
      socket.disconnect();
      setOrderNotification(false);
      setConnected(false);
    }
  }, [user]);

  return <>{children}</>;
}
