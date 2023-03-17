import { atom } from 'recoil';
import { IOrderData } from 'types/api';

export const isDarkAtom = atom<boolean>({
  key: 'isDark',
  default: true,
});

export const orderDataAtom = atom<IOrderData[]>({
  key: 'orderData',
  default: [],
});
