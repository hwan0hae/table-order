'use client';

import Seo from 'components/Seo';
import Tab from 'components/Tab';
import { Container, MenuNavContainer } from 'styles/styled';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Seo title="회원관리" description="회원관리 페이지입니다." />

      <Container>
        <MenuNavContainer>
          <Tab path="/member" item={{ text: '회원 목록' }} />
          <Tab path="/member" item={{ text: '회원 추가', slug: 'signup' }} />
        </MenuNavContainer>

        <div>{children}</div>
      </Container>
    </>
  );
}
