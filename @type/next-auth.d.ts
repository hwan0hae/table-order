import NextAuth from "next-auth";

// 여기서 재정의한 타입이 "session.user"의 타입으로 정의됨
declare module "next-auth" {
  type Session = {
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      auth: string;
      companyId: number;
      companyName: string;
    };
    expires: Date;
  };
}
