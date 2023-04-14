'use client';

import Seo from 'components/Seo';
import Tab from 'components/Tab';
import { Container, MenuNavContainer } from 'styles/styled';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Seo title="매출현황" description="매출현황 페이지입니다." />

      <Container>
        <MenuNavContainer>
          <Tab path="/sales" item={{ text: '매출 현황' }} />
        </MenuNavContainer>

        <div>{children}</div>
      </Container>
    </>
  );
}
