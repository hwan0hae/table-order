import { AxiosError, AxiosResponse } from 'axios';
import { Auth } from './data';

/** mutation response */
export interface IMutatedValue {
  message: string;
  data?: any;
}
interface IResponsesError {
  message?: string;
}
export interface IMutatedError extends AxiosError<IResponsesError> {}

/**회사 회원가입 */
export interface ISignUpData {
  companyName: string;
  companyNumber: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  auth: Auth;
}
/** member 회원가입 */
export interface IMemberSignUpData {
  email: string;
  password: string;
  name: string;
  phone: string;
  auth: Auth;
}

export interface ISignInData {
  email: string;
  password: string;
}
export interface ISessionUserData {
  id: number;
  email: string;
  name: string;
  phone: string;
  auth: string;
  companyId: number;
  companyName: string;
}

export interface IProductData {
  id: number;
  name: string;
  price?: string;
  description?: string;
  imageUrl?: string;
}

export interface IMemberData {
  id: number;
  email: string;
  name: string;
  phone: string;
  auth: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEditUserData {
  id: number;
  email: string;
  name: string;
  phone: string;
  auth: string;
  status: string;
}

export interface IOrderData {
  tableNo: number;
  order: {
    id: number;
    name: string;
    price: string;
    description: string;
    imageUrl: string;
    count: number;
  }[];
}
