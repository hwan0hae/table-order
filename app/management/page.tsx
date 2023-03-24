'use client';

import Product from 'components/Product';
import Seo from 'components/Seo';
import { useQuery } from 'react-query';
import { Box, List, Title } from 'styles/styled';
import { IProductData } from 'types/api';
import { getMenuList } from 'utill/api';

export default function Management() {
  const { data, isLoading } = useQuery<IProductData[]>('menuList', getMenuList);
  return (
    <>
      <Seo title="Management" description="매장 관리 페이지입니다." />

      <Box>
        <Title>매장 관리</Title>
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
