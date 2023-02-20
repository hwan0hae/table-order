import NextAuth from "next-auth";

// 여기서 재정의한 타입이 "session.user"의 타입으로 정의됨
declare module "next-auth" {
  interface Session {
    user: {
      idx: number;
      name: string;
      email: string;
      phone: string;
    };
    expires: Date;
  }
}
