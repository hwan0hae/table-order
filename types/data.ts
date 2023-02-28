import { UserData } from "./api";

/** user Table > react-table 데이터 타입 정의 */
export type UserTable = {
  tableHeader: { accessor: string; value: string }[];
  usersData: UserData[];
};

/** 삭제 모달로 보내지는 props 타입 정의 */
export type DeleteModalData = {
  id: number;
  title: string;
};
/** 수정 모달로 보내지는 props 타입 정의 */
export type EditModalData = {
  userData: UserData;
};

export type EditUserForm = {
  email: string;
  name: string;
  phone: string;
  auth: string;
  status: string;
};

export type ProductFormData = {
  name: string;
  price?: string;
  description?: string;
};

export const AUTH: string[] = ["ADMIN", "STAFF", "USER"];
