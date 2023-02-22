"use client";
import Seo from "components/Seo";
import { useSearchParams, usePathname } from "next/navigation";

export default function Detail({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <>
      <Seo title={""} description={`${".."}의 상세 페이지 입니다.`} />
      <h1>{`searchParams: ${searchParams.get("id")}`}</h1>
      <h1>{`pathname: ${pathname}`}</h1>
      <h1>{`params:${params.id}`}</h1>
    </>
  );
}
