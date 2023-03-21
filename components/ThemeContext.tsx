'use client';

import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'styles/theme';
import { isDarkAtom } from 'utill/atoms';

type Props = {
  children: React.ReactChild;
};

export default function ThemeContext({ children }: Props) {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
}
