import { Auth } from './data';

/**회사 회원가입 */
export interface SignUpCompany {
  companyName: string;
  companyNumber: number;
  email: string;
  password: string;
  name: string;
  phone: string;
}

/**유저 회원가입 */
export interface SignUpUser {
  email: string;
  password: string;
  passwordConfirm?: string;
  name: string;
  phone: string;
  auth?: Auth;
  companyName?: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

export interface ProductData {
  id: number;
  name: string;
  price?: string;
  description?: string;
  imageUrl?: string;
}

export interface UserData {
  id: number;
  email: string;
  name: string;
  phone: string;
  auth: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditUserData {
  id: number;
  email: string;
  name: string;
  phone: string;
  auth: string;
  status: string;
}

export interface OrderData {
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
