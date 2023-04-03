import { TableBox, Td, Text, Th } from 'styles/styled';
import { IOrderRecordData } from 'types/api';
import { ITable } from 'types/data';
import { Time } from 'utill/utill';
import { Menu, MenuRow } from './OrderList';

export default function OrderTable({
  tableHeader,
  rows,
}: ITable<IOrderRecordData>) {
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
          <tr key={data.orderId}>
            {/* headerKey를 순회하면서 key를 가져옴 */}
            {headerKey.map((key) => (
              <Td key={key + data.orderId}>
                {/* key로 객체의 값을 출력 */}
                {(() => {
                  switch (key) {
                    case 'no':
                      return index + 1;
                    case 'orderDetail':
                      return data.orderDetail.map((detail) => (
                        <Menu key={detail.detailId}>
                          <MenuRow>
                            <Text>{detail.productName}</Text>
                            <MenuRow>
                              <Text>
                                {detail.productPrice.toLocaleString()} X{' '}
                                {detail.productCount}개
                              </Text>
                            </MenuRow>
                          </MenuRow>
                        </Menu>
                      ));

                    case 'orderStatus':
                      if (data.orderStatus === 0)
                        return <Text style={{ color: 'red' }}>취소</Text>;
                      else return <Text>확인</Text>;
                    case 'createdAt':
                      return Time(data.createdAt);
                    case 'modifiedAt':
                      return Time(data.modifiedAt);

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
