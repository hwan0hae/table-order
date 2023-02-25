import { UserData } from "./api";

/** user Table > react-table 데이터 타입 정의 */
export type UserTable = {
  tableHeader: { accessor: string; value: string }[];
  userData: UserData[];
};
