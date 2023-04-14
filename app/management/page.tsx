'use client';

import Seo from 'components/Seo';
import { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Box,
  TableMapBox,
  TableMapContainer,
  TableMapText,
  Text,
  Title,
} from 'styles/styled';
import { IGetTableData } from 'types/api';
import { getTable } from 'utill/api';
import TableModal from 'components/TableModal';
import { ITableDetailData } from 'types/data';

export default function Management() {
  const { data, isLoading } = useQuery<IGetTableData[]>('table', getTable);
  const [tableModalVisible, setTableModalVisible] = useState<boolean>(false);
  const [tableDetail, setTableDetail] = useState<ITableDetailData>();

  const onTableClick = (id: number, no: number) => {
    setTableModalVisible(true);
    setTableDetail({ tableId: id, tableNo: no });
  };
  return (
    <>
      <Seo title="Management" description="매장 관리 페이지입니다." />

      <Box>
        <Title>매장 관리</Title>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          // <Canvas ref={canvasRef} width={750} height={750} />
          <TableMapContainer>
            {data?.map((table) => (
              <TableMapBox
                key={table.tableId}
                onClick={
                  table.status === '3'
                    ? () => onTableClick(table.tableId, table.tableNo)
                    : null
                }
                status={table.status}
                x={table.locX}
                y={table.locY}
                width={table.tableWidth}
                height={table.tableHeight}
              >
                <TableMapText>{table.tableNo}</TableMapText>
              </TableMapBox>
            ))}
          </TableMapContainer>
        )}
      </Box>
      {tableModalVisible && (
        <TableModal
          tableData={tableDetail}
          setTableModalVisible={setTableModalVisible}
        />
      )}
    </>
  );
}
