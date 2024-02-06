import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageLayout,
  PageHeader,
  MainTable,
  LinearLoading,
} from '@/components';

import { getUsers, UserProps } from '@/utils/api/users';

export type TableColumnProps = {
  key: string;
  label: string;
  render: (data: UserProps) => React.ReactNode;
};

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
        <LinearLoading />
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
