"use client";

import { Tab } from "components/Tab";
import { useSession } from "next-auth/react";
import { Container, MenuNavContainer } from "styles/styled";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  return (
    <Container>
      <MenuNavContainer>
        <Tab path="/menu" item={{ text: "Menu" }} />
        {status === "loading" ? null : (
          <>
            {session?.user.auth === "OWNER" ? (
              <Tab path="/menu" item={{ text: "Menu Add", slug: "add" }} />
            ) : null}
          </>
        )}
      </MenuNavContainer>

      <div>{children}</div>
    </Container>
  );
}
