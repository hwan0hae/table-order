'use client';

import React from 'react';
import Product from 'components/Product';
import Seo from 'components/Seo';
import { useQuery } from 'react-query';
import { Box, List, Title } from 'styles/styled';
import { IProductData } from 'types/api';
import { getMenuList } from 'utill/api';

// 나중에 옮길것

export default function Menu() {
  const { data, isLoading } = useQuery<IProductData[]>('menuList', getMenuList);
  return (
    <>
      <Seo title="Menu" description="메뉴 페이지입니다." />

      <Box>
        <Title>Menu</Title>
        {isLoading ? null : (
          <List>
            {data?.map((product) => (
              <Product key={product.id} productData={product} />
            ))}
          </List>
        )}
      </Box>
    </>
  );
}
