import { atom } from 'recoil';
import { IOrderRequestData } from 'types/api';

export const isDarkAtom = atom<boolean>({
  key: 'isDark',
  default: true,
});

export const orderRequestDataAtom = atom<IOrderRequestData[]>({
  key: 'orderRequestData',
  default: [],
});
