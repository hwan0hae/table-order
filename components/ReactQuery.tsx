'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function ReactQuery({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
