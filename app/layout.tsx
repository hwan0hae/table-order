"use client";

import StyledComponentsRegistry from "./registry";
import Nav from "components/Nav";
import Recoil from "components/Recoil";
import ReactQuery from "components/ReactQuery";
import ReactHotToast from "components/ReactHotToast";
import AuthContext from "components/AuthContext";
import { Wrapper } from "styles/styled";
import ThemeContext from "components/ThemeContext";
import Socket from "components/Socket";

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
        </AuthContext>
        <ReactHotToast />
      </body>
    </html>
  );
}
