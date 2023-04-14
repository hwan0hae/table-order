import { AxiosError } from 'axios';
import { Auth } from './type';

/** mutation response */
export interface IMutatedValue {
  message: string;
  data?: any;
}
interface IResponsesError {
  message?: string;
}
export type IMutatedError = AxiosError<IResponsesError>;

/** 회사 회원가입 */
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

export interface IProductData {
  id: number;
  name: string;
  price?: number;
  description?: string;
  imageUrl?: string;
}

export interface ITableAddData {
  name?: string;
  tableNo: number;
  locX: number;
  locY: number;
  tableWidth: number;
  tableHeight: number;
}

export interface IGetOrderDetailRequest {
  orderId: number;
  detailId: number;
  productName: string;
  productPrice: number;
  productCount: number;
  createdAt: Date;
}
export interface IOrderRequestData {
  orderDetail: IGetOrderDetailRequest[];
  orderId: number;
  tableNo: number;
  createdAt: Date;
}

export interface IOrderRecordData {
  orderDetail: IGetOrderDetailRequest[];
  orderId: number;
  tableNo: number;
  orderStatus: number;
  createdAt: Date;
  modifiedAt: Date;
}
export interface IOrderRecordPageData {
  orderData: IOrderRecordData[];
  totalPage: number;
  totalData: number;
}

export interface IInfiniteScrollData<T> {
  list: T;
  current_page: number;
  isLast: boolean;
}

export interface IGetTableData {
  tableId: number;
  tableNo: number;
  locX: number;
  locY: number;
  tableWidth: number;
  tableHeight: number;
  status: string;
}

export interface IGetTableDetailData {
  orderId: number;
  modifiedAt: Date;
  orderDetail: IGetOrderDetailRequest[];
}

export interface IGetSalesData {
  monthlySales: number;
  dailySales: {
    day: string;
    salesAmount: number;
  }[];
}

export interface IGetDailySalesData {
  productId: number;
  productName: string;
  productCount: number;
  productPrice: number;
}
