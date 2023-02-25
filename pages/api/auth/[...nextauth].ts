import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "email-password-credential",
      type: "credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "email",
          placeholder: "이메일을 입력하세요.",
        },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호를 입력하세요.",
        },
      },
      // 로그인 유효성 검사
      //@ts-ignore
      async authorize(credentials: Record<any, any>, req: NextApiRequest) {
        if (!credentials)
          throw new Error("잘못된 입력값으로 인한 오류가 발생했습니다.");

        const { email, password } = credentials;

        const exUser = await prisma.user.findUnique({
          where: { email },
        });
        if (!exUser) throw new Error("존재하지 않는 이메일입니다.");
        if (exUser.status === "false") {
          throw new Error("회원탈퇴한 계정입니다. 고객센터에 문의해주세요.");
        }
        if (exUser.status === "standby") {
          throw new Error("정지되어있는 계정입니다. 고객센터에 문의해주세요.");
        }
        const result = await bcrypt.compare(password, exUser.password);
        if (!result) throw new Error("비밀번호가 일치하지 않습니다.");

        // 반환하는 값중에 name, email 살려서 "session.user"로 들어감 (깊숙히 파고들면 id, email,name,image 만 리턴 하게 짜여있음)
        return exUser;
      },
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      const user = await prisma.user.findUnique({
        where: { email: token.email },
        select: {
          auth: true,
        },
      });
      token.auth = user.auth;

      return token;
    },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          companyId: true,
        },
      });
      const company = await prisma.company.findUnique({
        where: { id: user.companyId },
        select: {
          name: true,
        },
      });

      const exUser = { ...user, companyName: company.name, auth: token.auth };

      // 로그인한 유저 데이터 재정의 > @tpye/
      // 단, 기존에 "user"의 형태가 정해져있기 때문에 변경하기 위해서는 타입 재정의가 필요함 (위에서 말한 리턴 값 정의 그래서 새로 type 정의 해주어야함)
      session.user = exUser;
      // 여기서 반환한 session값이 "useSession()"의 "data"값이 됨
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};

export default NextAuth(authOptions);
