'use client';

import Calendar from 'components/Calendar';
import { Box, Title } from 'styles/styled';

export default function Sales() {
  return (
    <Box>
      <Title>매출 현황</Title>
      <Calendar />
    </Box>
  );
}
