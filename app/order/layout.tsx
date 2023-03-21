'use client';

import Seo from 'components/Seo';
import Tab from 'components/Tab';
import { Container, MenuNavContainer } from 'styles/styled';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Seo title="주문" description="주문관리 페이지입니다." />

      <Container>
        <MenuNavContainer>
          <Tab path="/order" item={{ text: '주문' }} />
          <Tab path="/order" item={{ text: '주문 기록', slug: 'record' }} />
        </MenuNavContainer>

        <div>{children}</div>
      </Container>
    </>
  );
}
