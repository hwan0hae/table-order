import { JWTPayload, jwtVerify } from 'jose';
import { useEffect, useRef } from 'react';

/** 첫 렌더링 막기 */
export const useDidMountEffect = (func: () => any, deps: Array<any>) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

/** 이미지 선택 */
export const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB

  const target = e.currentTarget;
  const files = (target.files as FileList)[0];
  target.value = '';
  if (files === undefined) {
    return {};
  }
  // 파일 용량 체크
  if (files.size > FILE_SIZE_MAX_LIMIT) {
    alert('업로드 가능한 최대 용량은 5MB입니다. ');
    return {};
  }

  return files;
};

/** jwt 검증 */
export async function verify(
  token: string,
  secret: string
): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload;
  } catch (error) {
    return error;
  }
}

/** 경과 시간 */
export const Time = (date: Date) => {
  const time = new Date(date);
  return time.toLocaleString();
};

/** 경과 시간 */
export const elapsedTime = (date: Date) => {
  const start = new Date(date);
  const end = new Date();
  const diff = ((end as any) - (start as any)) / 1000;
  const times = [
    { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
    { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
    { name: '일', milliSeconds: 60 * 60 * 24 },
    { name: '시간', milliSeconds: 60 * 60 },
    { name: '분', milliSeconds: 60 },
  ];

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);
    if (betweenTime > 0) {
      return `${betweenTime}${value.name}`;
    }
  }
  return '방금';
};
