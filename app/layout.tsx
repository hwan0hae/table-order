"use client";

import { ThemeProvider } from "styled-components";

import StyledComponentsRegistry from "./registry";
import Nav from "components/Nav";
import { darkTheme } from "styles/theme";
import Recoil from "components/Recoil";
import ReactQuery from "components/ReactQuery";
import ReactHotToast from "components/ReactHotToast";
import AuthContext from "components/AuthContext";
import { Wrapper } from "styles/styled";

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="ko_KR">
      <head />
      <body>
        <AuthContext>
          <Recoil>
            <ReactQuery>
              <ThemeProvider theme={darkTheme}>
                <StyledComponentsRegistry>
                  <Nav />
                  <Wrapper> {children} </Wrapper>
                </StyledComponentsRegistry>
              </ThemeProvider>
            </ReactQuery>
          </Recoil>
        </AuthContext>
        <ReactHotToast />
      </body>
    </html>
  );
}
