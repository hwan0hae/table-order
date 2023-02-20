import axios from "axios";

export interface ISignUpUser {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export async function signUpUser(info: ISignUpUser) {
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
