import axios from "axios";
import { EditUserData, SignUpUser } from "types/api";

/** users api */
export async function signUpUser(data: SignUpUser) {
  const request = await axios.post("/api/users/signup", data);

  return request.data;
}
export async function getUserList() {
  const request = await axios.get(`/api/users`);

  return request.data;
}
export async function UserDelete(id: number) {
  const data = { id };
  const request = await axios.post(`/api/users/delete`, data);

  return request.data;
}
export async function UserEdit(data: EditUserData) {
  const request = await axios.post(`/api/users/edit`, data);

  return request.data;
}

/** menu api */
export async function menuAdd(formData: FormData) {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const request = await axios.post("/api/menu/add", formData, config);

  return request.data;
}

export async function getMenuList() {
  const request = await axios.get("/api/menu/list");

  return request.data;
}
