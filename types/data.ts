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

/** Table > react-table 데이터 타입 정의 */
export interface ITable<T> {
  tableHeader: { accessor: string; value: string }[];
  rows: T[];
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

export interface ITableDetailData {
  tableId: number;
  tableNo: number;
}
export interface ITableModalProps {
  tableData: ITableDetailData;
  setTableModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IDailyModalProps {
  year: number;
  month: number;
  day: number;
  setDay: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface IEditUserForm {
  email: string;
  name: string;
  phone: string;
  auth: string;
  status: string;
}

export interface IProductAddFormData {
  name: string;
  price?: number;
  description?: string;
}

export interface ITableAddFormData {
  name?: string;
  tableNo: number;
}

export interface IDrawTableData {
  locX: number;
  locY: number;
  tableWidth: number;
  tableHeight: number;
}
