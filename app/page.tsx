'use client';

import Seo from 'components/Seo';
import { Text } from 'styles/styled';

export default function Home() {
  return (
    <>
      <Seo title="홈" description="테이블 오더의 홈입니다." />
      <div style={{ height: 'calc(100vh - 60px)' }}>
        <Text>홈</Text>
      </div>
    </>
  );
}
