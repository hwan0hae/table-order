import { IUserData } from './api';

/**회사 회원가입 유효성 폼  */
export interface CompanySignUpForm {
  companyName: string;
  companyNumber: string;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
}
export interface MemberSignUpForm {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  auth: Auth;
}

/** user Table > react-table 데이터 타입 정의 */
export interface UserTable {
  tableHeader: { accessor: string; value: string }[];
  usersData: IUserData[];
}

/** 삭제 모달로 보내지는 props 타입 정의 */
export interface DeleteModalData {
  id: number;
  title: string;
}
/** 수정 모달로 보내지는 props 타입 정의 */
export interface EditModalData {
  userData: IUserData;
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

export type Auth = 'OWNER' | 'ADMIN' | 'STAFF' | 'USER';

//MEMBER로 바꿀것
export const MEMBER_AUTH: Auth[] = ['ADMIN', 'STAFF', 'USER'];
