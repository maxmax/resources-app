import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import MainTable from '@/components/MainTable';

import { getUsers } from './api';
import { UserProps, TableColumnProps } from './types';

const columns: TableColumnProps[] = [
  { key: 'id', label: '#', render: (data: UserProps) => data.id },
  { key: 'name', label: 'User name', render: (data: UserProps) => data.name },
  { key: 'email', label: 'User email', render: (data: UserProps) => data.email },
];

export default function Users() {

  const navigate = useNavigate();

  const { status, data, error } = getUsers();

  const editUser = (id: number) => {
    navigate(`/users/${id}`);
  }

  return (
    <PageLayout>
      <PageHeader title='Users' />
      {status === 'loading' ? (
        <LinearProgress />
      ) : error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <MainTable data={data as UserProps[]} columns={columns} edit={editUser} />
        </>
      )}
    </PageLayout>
  );
}
