"use client";
import Product from "components/Product";
import Seo from "components/Seo";
import { useQuery } from "react-query";
import { Box, List, Title } from "styles/styled";
import { ProductData } from "types/api";
import { getMenuList } from "utill/api";

//나중에 옮길것

export default function Menu() {
  //ssr할지 요기서할지 선택해야함!
  const { data, isLoading } = useQuery<ProductData[]>("menuList", getMenuList);
  return (
    <>
      <Seo title={"Menu"} description={"메뉴 페이지입니다."} />

      <Box>
        <Title>Menu</Title>
        {isLoading ? null : (
          <List>
            {data?.map((product) => (
              <>
                <Product
                  key={product.id}
                  idx={product.id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  imageUrl={product.imageUrl}
                />
              </>
            ))}
          </List>
        )}
      </Box>
    </>
  );
}
