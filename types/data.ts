import { UserData } from './api';

/**회사 회원가입 유효성 폼  */
export interface SignUpCompanyForm {
  companyName: string;
  companyNumber: number;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
}

/** user Table > react-table 데이터 타입 정의 */
export interface UserTable {
  tableHeader: { accessor: string; value: string }[];
  usersData: UserData[];
}

/** 삭제 모달로 보내지는 props 타입 정의 */
export interface DeleteModalData {
  id: number;
  title: string;
}
/** 수정 모달로 보내지는 props 타입 정의 */
export interface EditModalData {
  userData: UserData;
}

export interface EditUserForm {
  email: string;
  name: string;
  phone: string;
  auth: string;
  status: string;
}

export interface ProductFormData {
  name: string;
  price?: string;
  description?: string;
}

export type Auth = 'ADMIN' | 'STAFF' | 'USER';

export const AUTH: Auth[] = ['ADMIN', 'STAFF', 'USER'];
