'use client';

import Tab from 'components/Tab';
import { useEffect, useState } from 'react';
import { Container, MenuNavContainer } from 'styles/styled';
import { ISessionUserData } from 'types/api';
import { useSessionStorage } from 'usehooks-ts';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useSessionStorage<ISessionUserData | undefined>(
    'user',
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <Container>
      <MenuNavContainer>
        <Tab path="/menu" item={{ text: 'Menu' }} />
        {isLoading ? null : (
          <>
            {user.auth === 'OWNER' ? (
              <Tab path="/menu" item={{ text: 'Menu Add', slug: 'add' }} />
            ) : null}
          </>
        )}
      </MenuNavContainer>

      <div>{children}</div>
    </Container>
  );
}
