import { TableBox, Td, Th } from 'styles/styled';
import { IMemberTable } from 'types/data';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

export default function Table({ tableHeader, memberData }: IMemberTable) {
  //데이터 읽는용일시 useMemo 사용할것 no렌더링
  /** header와 데이터 비매칭 방지용 키  */
  const headerKey = tableHeader.map((header) => header.accessor);
  return (
    <TableBox>
      <thead>
        <tr>
          {tableHeader.map((header) => (
            <Th key={header.accessor}>{header.value}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {memberData.map((member, index) => (
          <tr key={member.id}>
            {/* headerKey를 순회하면서 key를 가져옴 */}
            {headerKey.map((key) => (
              <Td key={key + member.id}>
                {/* key로 객체의 값을 출력 */}
                {key === 'no' ? (
                  index
                ) : key === 'edit' ? (
                  <EditModal userData={member} />
                ) : key === 'delete' ? (
                  <DeleteModal id={member.id} title={member.name} />
                ) : (
                  member[key]
                )}
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableBox>
  );
}
