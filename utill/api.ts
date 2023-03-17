import axios, { AxiosResponse } from 'axios';
import {
  IEditUserData,
  IMemberSignUpData,
  ISignInData,
  ISignUpData,
} from 'types/api';

/** user api */
export async function signUp(data: ISignUpData) {
  const request = await axios.post('/api/v1/web/user/signup', data);

  return request.data;
}

export async function memberSignUp(data: IMemberSignUpData) {
  const request = await axios.post('/api/v1/web/user/member/signup', data);

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

export async function getUserList() {
  const request = await axios.get(`/api/users`);

  return request.data;
}
export async function userDelete(id: number) {
  const data = { id };
  const request = await axios.post(`/api/users/delete`, data);

  return request.data;
}
export async function userEdit(data: IEditUserData) {
  const request = await axios.post(`/api/users/edit`, data);

  return request.data;
}

/** menu api */
export async function menuAdd(formData: FormData) {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const request = await axios.post('/api/menu/add', formData, config);

  return request.data;
}

export async function getMenuList() {
  const request = await axios.get('/api/menu/list');

  return request.data;
}

export async function productDelete(id: number) {
  const data = { id };
  const request = await axios.post(`/api/menu/delete`, data);

  return request.data;
}

export async function productEdit(formData: FormData) {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const request = await axios.post('/api/menu/edit', formData, config);

  return request.data;
}
