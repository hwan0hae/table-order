import { atom } from 'recoil';
import { Socket } from 'socket.io-client';
import { IOrderRequestData } from 'types/api';

export const isDarkAtom = atom<boolean>({
  key: 'isDark',
  default: true,
});

export const orderRequestDataAtom = atom<IOrderRequestData[]>({
  key: 'orderRequestData',
  default: [],
});

export const orderNotificationAtom = atom<boolean>({
  key: 'orderNotification',
  default: false,
});
