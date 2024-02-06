import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  PageLayout,
  PageHeader,
  MainTable,
  LinearLoading,
} from '@/components';

import { 
  getResources, 
  ResourceProps,
} from '@/utils/api/resources';

export type TableColumnProps = {
  key: string;
  label: string;
  render: (data: ResourceProps) => React.ReactNode;
};

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
        <LinearLoading />
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
