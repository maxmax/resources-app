import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import LinearProgress from '@mui/material/LinearProgress';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import MainTable from '@/components/MainTable';

import { getResources } from './api';
import { ResourceProps, TableColumnProps } from './types';

const columns: TableColumnProps[] = [
  { key: 'id', label: '#', render: (data: ResourceProps) => data.id },
  {
    key: 'createdAt',
    label: 'createdAt',
    render: (data: ResourceProps) => dayjs(data.createdAt).format('DD/MM/YYYY'),
  },
  { key: 'title', label: 'title', render: (data: ResourceProps) => data.title },
  { key: 'status', label: 'status', render: (data: ResourceProps) => data.status },
];

export default function Resources() {

  const navigate = useNavigate();

  const { status, data, error } = getResources();

  const editResource = (id: number) => {
    navigate(`/resources/${id}`);
  }

  return (
    <PageLayout>
      <PageHeader title='Resources' />
      {status === 'loading' ? (
        <LinearProgress />
      ) : error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <MainTable data={data as ResourceProps[]} columns={columns} edit={editResource} />
        </>
      )}
    </PageLayout>
  );
}
