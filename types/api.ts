/**회사 회원가입 */
export type SignUpCompany = {
  companyName: string;
  companyNumber: number;
  email: string;
  password: string;
  passwordConfirm?: string;
  name: string;
  phone: string;
};

/**유저 회원가입 */
export type SignUpUser = {
  email: string;
  password: string;
  passwordConfirm?: string;
  name: string;
  phone: string;
  auth?: string;
  companyName?: string;
};

export type SignInUser = {
  email: string;
  password: string;
};

export type ProductData = {
  id: number;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
};

export type UserData = {
  id: number;
  email: string;
  name: string;
  phone: string;
  auth: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EditUserData = {
  id: number;
  email: string;
  name: string;
  phone: string;
  auth: string;
  status: string;
};
