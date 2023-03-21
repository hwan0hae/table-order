'use client';

import React from 'react';
import Table from 'components/Table';
import { useQuery } from 'react-query';
import { Box, HorizontalScrollContainer, Text, Title } from 'styles/styled';
import { IMemberData } from 'types/api';
import { getMemberList } from 'utill/api';

export default function Users() {
  const { data, isLoading } = useQuery<IMemberData[]>(
    'userList',
    getMemberList
  );
  const tableHeader = [
    {
      accessor: 'no',
      value: 'No',
    },
    {
      accessor: 'name',
      value: '이름',
    },
    {
      accessor: 'email',
      value: '이메일',
    },
    {
      accessor: 'phone',
      value: '핸드폰 번호',
    },
    {
      accessor: 'auth',
      value: '권한',
    },
    {
      accessor: 'created_at',
      value: '생성일',
    },
    {
      accessor: 'updated_at',
      value: '수정일',
    },
    {
      accessor: 'edit',
      value: '수정',
    },
    {
      accessor: 'delete',
      value: '삭제',
    },
  ];

  return (
    <Box>
      <Title>회원 목록</Title>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>회원 수: {data.length}</Text>
          <HorizontalScrollContainer>
            <Table tableHeader={tableHeader} memberData={data} />
          </HorizontalScrollContainer>
        </>
      )}
    </Box>
  );
}
