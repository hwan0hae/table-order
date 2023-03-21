'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Btn } from 'styles/styled';

type Item = {
  text: string;
  slug?: string;
  segment?: string;
};
export default function Tab({ path, item }: { path: string; item: Item }) {
  const segment = useSelectedLayoutSegment();
  const href = item.slug ? `${path}/${item.slug}` : path;
  const isActive =
    // Example home pages e.g. `/layouts`
    (!item.slug && segment === null) ||
    // Nested pages e.g. `/layouts/electronics`
    segment === item.slug;

  return (
    <Link href={href}>
      <Btn style={isActive ? { color: '#279ef9' } : null}>{item.text}</Btn>
    </Link>
  );
}
