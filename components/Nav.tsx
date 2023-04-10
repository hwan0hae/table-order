'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Btn, Row, Text } from 'styles/styled';
import { IMutatedError, IMutatedValue, ISessionUserData } from 'types/api';
import { isDarkAtom, orderNotificationAtom } from 'utill/atoms';
import { useSessionStorage } from 'usehooks-ts';
import { useMutation } from 'react-query';
import { logout } from 'utill/api';
import { toast } from 'react-hot-toast';

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
  border-bottom: 1px solid ${(props) => props.theme.borderLine};
  z-index: 10;
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
  transition: fill 0.2s ease-in-out;
`;
const LogoText = styled.div`
  margin-left: 6px;
  font-size: 1.25em;
  font-weight: 600;
  transition: color 0.2s ease-in-out;
`;

const Items = styled.ul`
  margin: 0 16px;
`;
const Item = styled.li`
  position: relative;
  float: left;
  margin-right: 10px;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #279ef9;
  }
`;
const Notify = styled.div`
  position: absolute;
  background-color: red;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  right: -4px;
  top: -4px;
`;
const DarkModeBtn = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.borderLine};
  }
`;
export default function Nav() {
  const router = useRouter();
  const [isDark, setIsDark] = useRecoilState<boolean>(isDarkAtom);
  const OrderNotification = useRecoilValue<boolean>(orderNotificationAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useSessionStorage<ISessionUserData>(
    'user',
    undefined
  );
  const logoutMutation = useMutation<IMutatedValue, IMutatedError>(logout, {
    onError: (res) => {
      toast.error(res.response?.data.message);
    },
    onSuccess: (res) => {
      setUser(undefined);
      sessionStorage.removeItem('user');
      toast.success(res.message);
      router.push('/');
    },
  });
  const DarkModeToggle = () => {
    setIsDark((prv) => !prv);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <NavBar>
      <Row>
        <Link href="/">
          <Logo>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z" />
            </Svg>
            <LogoText>T - O</LogoText>
          </Logo>
        </Link>
        <Items>
          <Link href="/menu">
            <Item>메뉴 보기</Item>
          </Link>
          <Link href="/coupon">
            <Item>쿠폰</Item>
          </Link>
          <Link href="/order">
            <Item>
              주문
              {OrderNotification && <Notify />}
            </Item>
          </Link>
          <Link href="/management">
            <Item>매장관리</Item>
          </Link>
          {isLoading ? null : (
            <>
              {user && (
                <>
                  {user.auth === 'OWNER' ? (
                    <Link href="/member">
                      <Item>회원관리</Item>
                    </Link>
                  ) : null}
                </>
              )}
            </>
          )}
        </Items>
      </Row>
      <Row>
        <DarkModeBtn onClick={DarkModeToggle}>
          {isDark ? (
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z" />
            </Svg>
          ) : (
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
            </Svg>
          )}
        </DarkModeBtn>
        {isLoading ? (
          <Text> Loading...</Text>
        ) : (
          <>
            {user ? (
              <>
                <Text>[{user?.companyName}]</Text>
                <Text>{user?.name}님</Text>
                <Btn onClick={() => logoutMutation.mutate()}>로그아웃</Btn>
              </>
            ) : (
              <>
                <Btn onClick={() => router.push('/signin')}>로그인</Btn>
                <Link href="/signup">
                  <Btn>회원 가입</Btn>
                </Link>
              </>
            )}
          </>
        )}
      </Row>
    </NavBar>
  );
}
