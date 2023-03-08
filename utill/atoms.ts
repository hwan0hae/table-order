import { atom } from "recoil";
import { OrderData } from "types/api";

export const isDarkAtom = atom<boolean>({
  key: "isDark",
  default: true,
});

export const orderDataAtom = atom<OrderData[]>({
  key: "orderData",
  default: [],
});
