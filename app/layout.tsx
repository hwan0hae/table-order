'use client';

import React from 'react';
import Nav from 'components/Nav';
import Recoil from 'components/Recoil';
import ReactQuery from 'components/ReactQuery';
import ReactHotToast from 'components/ReactHotToast';
import { Wrapper } from 'styles/styled';
import ThemeContext from 'components/ThemeContext';
import Socket from 'components/Socket';
import StyledComponentsRegistry from './registry';

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="ko">
      <head />
      <body>
        <Recoil>
          <ReactQuery>
            <ThemeContext>
              <StyledComponentsRegistry>
                <Socket>
                  <Nav />
                  <Wrapper> {children} </Wrapper>
                </Socket>
              </StyledComponentsRegistry>
            </ThemeContext>
          </ReactQuery>
        </Recoil>
        <ReactHotToast />
      </body>
    </html>
  );
}
