import { IMemberData } from './api';
import { Auth } from './type';

/** 회사 회원가입 유효성 폼  */
export interface ICompanySignUpForm {
  companyName: string;
  companyNumber: string;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
}
export interface IMemberSignUpForm {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  auth: Auth;
}

/** user Table > react-table 데이터 타입 정의 */
export interface IMemberTable {
  tableHeader: { accessor: string; value: string }[];
  memberData: IMemberData[];
}

/** 삭제 모달로 보내지는 props 타입 정의 */
export interface IDeleteModalData {
  id: number;
  title: string;
}
/** 수정 모달로 보내지는 props 타입 정의 */
export interface IEditModalData {
  userData: IMemberData;
}

export interface IEditUserForm {
  email: string;
  name: string;
  phone: string;
  auth: string;
  status: string;
}

export interface IProductFormData {
  name: string;
  price?: number;
  description?: string;
}
