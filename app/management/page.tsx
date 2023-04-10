'use client';

import Seo from 'components/Seo';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Text, Title } from 'styles/styled';
import { IGetTableData } from 'types/api';
import { getTable } from 'utill/api';
import styled from 'styled-components';
import TableModal from 'components/TableModal';
import { ITableDetailData } from 'types/data';

const TableContainer = styled.div`
  background-color: ${(props) => props.theme.borderLine};
  position: relative;
  width: 750px;
  height: 750px;
`;

const TableBox = styled.div<{
  status: string;
  x: number;
  y: number;
  width: number;
  height: number;
}>`
  position: absolute;
  display: ${(props) => (props.status === '0' ? 'none' : 'default')};
  border: 1px solid
    ${(props) =>
      props.status === '2' ? 'green' : props.status === '3' ? 'red' : 'white'};
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  cursor: ${(props) => (props.status === '3' ? 'pointer' : 'default')};
  transition: border-color 0.2s ease-in;

  &:hover {
    border-color: ${(props) => (props.status === '3' ? 'pink' : 'none')};
  }
`;

const TableText = styled.span`
  color: white;
  font-size: 2em;
  font-weight: 600;
  margin: 6px;
`;

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
          <TableContainer>
            {data?.map((table) => (
              <TableBox
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
                <TableText>{table.tableNo}</TableText>
              </TableBox>
            ))}
          </TableContainer>
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
