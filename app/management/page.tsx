'use client';

import Seo from 'components/Seo';
import { Box, Title } from 'styles/styled';

export default function Management() {
  return (
    <>
      <Seo title="Management" description="매장 관리 페이지입니다." />

      <Box>
        <Title>매장 관리</Title>
      </Box>
    </>
  );
}
