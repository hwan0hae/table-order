"use client";
import Seo from "components/Seo";

export default function Detail({ params }: { params: { id: string } }) {
  // client 보이는 url 및 헤더 수정도 생각

  return (
    <>
      <Seo
        title={params.id}
        description={`${params.id}의 상세 페이지 입니다.`}
      />
      <h1>{`params:${params.id}`}</h1>
    </>
  );
}
