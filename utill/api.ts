import axios from "axios";
import { SignUpUser } from "types/api";

export async function signUpUser(info: SignUpUser) {
  const request = await axios.post("/api/auth/signup", info);

  return request.data;
}

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
