"use client";
import Product from "components/Product";
import Seo from "components/Seo";
import { useQuery } from "react-query";
import { Box, List, Title } from "styles/styled";
import { getMenuList } from "utill/api";

//나중에 옮길것
interface IProduct {
  idx: number;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

export default function Menu() {
  //ssr할지 요기서할지 선택해야함!
  const { data, isLoading } = useQuery<IProduct[]>("menuList", getMenuList);
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
                  key={product.idx}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  imageUrl={product.imageUrl}
                />
                <Product
                  key={product.idx}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  imageUrl={product.imageUrl}
                />
                <Product
                  key={product.idx}
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
