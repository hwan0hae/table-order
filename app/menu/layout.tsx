"use client";

import { Tab } from "components/Tab";
import { Container, MenuNavContainer } from "styles/styled";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <MenuNavContainer>
        <Tab path="/menu" item={{ text: "Menu" }} />
        <Tab path="/menu" item={{ text: "Menu Add", slug: "add" }} />
      </MenuNavContainer>

      <div>{children}</div>
    </Container>
  );
}
