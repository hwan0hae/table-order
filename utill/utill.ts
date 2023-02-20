import { useEffect, useRef } from "react";

/** 첫 렌더링 막기 */
export const useDidMountEffect = (func: () => any, deps: Array<any>) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

/** 이미지 선택 */
export const onImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB

  const target = e.currentTarget;
  const files = (target.files as FileList)[0];
  target.value = "";
  if (files === undefined) {
    return;
  }
  // 파일 용량 체크
  if (files.size > FILE_SIZE_MAX_LIMIT) {
    alert("업로드 가능한 최대 용량은 5MB입니다. ");
    return;
  }

  return files;
};
