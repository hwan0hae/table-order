import { useMemo } from "react";
import { Delete, Edit, TableBox, Td, Th } from "styles/styled";
import { UserTable } from "types/data";

export default function Table({ tableHeader, userData }: UserTable) {
  const headers = useMemo(() => tableHeader, []);
  const users = useMemo(() => userData, []);

  /** header와 데이터 비매칭 방지용 키  */
  const headerKey = headers.map((header) => header.accessor);
  return (
    <TableBox>
      <thead>
        <tr>
          {headers.map((header) => (
            <Th key={header.accessor}>{header.value}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((data, index) => (
          <tr key={index}>
            {/* headerKey를 순회하면서 key를 가져옴 */}
            {headerKey.map((key) => (
              <Td key={key + index}>
                {/* key로 객체의 값을 출력 */}
                {key === "no" ? (
                  index
                ) : key === "edit" ? (
                  <Edit>수정</Edit>
                ) : key === "delete" ? (
                  <Delete>삭제</Delete>
                ) : (
                  data[key]
                )}
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableBox>
  );
}
