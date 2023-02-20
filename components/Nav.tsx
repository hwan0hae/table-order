"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Btn, Row } from "styles/styled";
import { useDidMountEffect } from "utill/utill";

const NavBar = styled.nav`
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.navBarColor};
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
`;
const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
  &:hover {
    svg {
      fill: ${(props) => props.theme.activeColor};
    }
    div {
      color: ${(props) => props.theme.activeColor};
    }
  }
`;
const Svg = styled.svg`
  height: 30px;
  width: 30px;
  fill: ${(props) => props.theme.textColor};
  margin-right: 6px;
  transition: fill 0.2s ease-in-out;
`;
const LogoText = styled.div`
  font-size: 1.25em;
  font-weight: 600;
  transition: color 0.2s ease-in-out;
`;

const Items = styled.ul`
  margin: 0 16px;
`;
const Item = styled.li`
  float: left;
  margin-right: 10px;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #279ef9;
  }
`;
export default function Nav() {
  const router = useRouter();
  const { data: session, status } = useSession();
  // status는 "authenticated" | "loading" | "unauthenticated"를 가짐 ( 로그인 여부 판단에 사용 )
  // data는 "expires"와 "user"( "callbacks"의 "session()"에서 반환한 값 )를 가짐

  return (
    <NavBar>
      <Row>
        <Link href={"/"}>
          <Logo>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z" />
            </Svg>
            <LogoText>T - O</LogoText>
          </Logo>
        </Link>
        <Items>
          <Link href={"/menu"}>
            <Item>메뉴 보기</Item>
          </Link>
          <Link href={"/coupon"}>
            <Item>쿠폰</Item>
          </Link>
          <Link href={"/notify"}>
            <Item>알림</Item>
          </Link>
        </Items>
      </Row>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <Row>
          {session?.user ? (
            <>
              <div>{session.user.name}님</div>
              <Btn onClick={() => signOut()}>로그아웃</Btn>
            </>
          ) : (
            <>
              <Btn onClick={() => router.push("/signin")}>로그인</Btn>
              <Link href={"/signup"}>
                <Btn>회원가입</Btn>
              </Link>
            </>
          )}
        </Row>
      )}
    </NavBar>
  );
}
