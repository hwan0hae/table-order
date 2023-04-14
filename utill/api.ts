import axios from 'axios';
import {
  IEditUserData,
  IMemberSignUpData,
  ISignInData,
  ISignUpData,
  ITableAddData,
} from 'types/api';

/** user api */
export async function signUp(data: ISignUpData) {
  const request = await axios.post('/api/v1/web/user/signup', data);

  return request.data;
}

export async function signIn(data: ISignInData) {
  const request = await axios.post('/api/v1/web/user/signin', data);

  return request.data;
}

export async function logout() {
  const request = await axios.post('/api/v1/web/user/logout');

  return request.data;
}

export async function userDelete(id: number) {
  const data = { id };
  const request = await axios.post(`/api/v1/web/user/delete`, data);

  return request.data;
}
export async function userEdit(data: IEditUserData) {
  const request = await axios.post(`/api/v1/web/user/edit`, data);

  return request.data;
}

export async function getMemberList() {
  const request = await axios.get(`/api/v1/web/member/list`);

  return request.data;
}

export async function memberSignUp(data: IMemberSignUpData) {
  const request = await axios.post('/api/v1/web/member/signup', data);

  return request.data;
}

/** menu api */
export async function getMenuList() {
  const request = await axios.get('/api/v1/web/menu/list');

  return request.data;
}

export async function productAdd(formData: FormData) {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const request = await axios.post('/api/v1/web/menu/add', formData, config);

  return request.data;
}

export async function productDelete(id: number) {
  const data = { id };
  const request = await axios.post(`/api/v1/web/menu/delete`, data);

  return request.data;
}

export async function productEdit(formData: FormData) {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const request = await axios.post('/api/v1/web/menu/edit', formData, config);

  return request.data;
}

/** table management api */
export async function getTable() {
  const request = await axios.get(`/api/v1/web/management/table`);

  return request.data;
}
export async function getTableDetail(tableId: number) {
  const request = await axios.get(
    `/api/v1/web/management/tabledetail?id=${tableId}`
  );

  return request.data;
}
export async function tablePayment(tableId: number) {
  const data = { tableId };
  const request = await axios.post('/api/v1/web/management/payment', data);

  return request.data;
}
export async function tableAdd(data: ITableAddData) {
  const request = await axios.post('/api/v1/web/management/add', data);

  return request.data;
}

/** order api */
export async function getOrderRequest() {
  const request = await axios.get(`/api/v1/web/order/request`);

  return request.data;
}
export async function OrderCheck(id: number) {
  const data = { orderId: id };
  const request = await axios.post(`/api/v1/web/order/check`, data);

  return request.data;
}
export async function OrderCancel(id: number) {
  const data = { orderId: id };
  const request = await axios.post(`/api/v1/web/order/cancel`, data);

  return request.data;
}

export async function getOrderRecord(page: number | string = 1) {
  const request = await axios.get(`/api/v1/web/order/record?p=${page}`);

  return request.data;
}

export async function getSales(year: number, month: number) {
  const request = await axios.get(
    `/api/v1/web/sales?year=${year}&month=${month}`
  );

  return request.data;
}

export async function getDailySales(year: number, month: number, day: number) {
  const request = await axios.get(
    `/api/v1/web/sales/day?year=${year}&month=${month}&day=${day}`
  );

  return request.data;
}
