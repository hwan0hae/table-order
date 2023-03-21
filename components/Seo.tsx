interface ISeo {
  title: string;
  description: string;
}

export default function Seo({
  title = '테이블오더',
  description = '인혁인혁-인혁인혁 프로젝트',
}: ISeo) {
  const titleMsg = `${title} | 테이블오더 `;

  // ssr 처리해줘야할듯함
  return (
    <>
      {/* 현 페이지 제목 */}
      <title>{titleMsg}</title>

      {/* 현 페이지 설명 */}
      <meta name="description" content={description} />
    </>
  );
}
