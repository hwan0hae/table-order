"use client";

import Seo from "components/Seo";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <Seo title={"홈"} description={"테이블 오더의 홈입니다."} />
      <div style={{ height: "calc(100vh - 60px)" }}>홈</div>
    </>
  );
}
