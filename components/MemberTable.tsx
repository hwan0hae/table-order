import { TableBox, Td, Th } from 'styles/styled';
import { IMemberData } from 'types/api';
import { ITable } from 'types/data';
import { Time } from 'utill/utill';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

export default function MemberTable({
  tableHeader,
  rows,
}: ITable<IMemberData>) {
  // 데이터 읽는용일시 useMemo 사용할것 no렌더링
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
        {rows.map((data, index) => (
          <tr key={data.id}>
            {/* headerKey를 순회하면서 key를 가져옴 */}
            {headerKey.map((key) => (
              <Td key={key + data.id}>
                {/* key로 객체의 값을 출력 */}
                {(() => {
                  switch (key) {
                    case 'no':
                      return index + 1;
                    case 'edit':
                      return <EditModal userData={data} />;
                    case 'delete':
                      return <DeleteModal id={data.id} title={data.name} />;
                    case 'createdAt':
                      return Time(data.createdAt);
                    case 'updatedAt':
                      return Time(data.updatedAt);
                    default:
                      return data[key];
                  }
                })()}
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableBox>
  );
}
