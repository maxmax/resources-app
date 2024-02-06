export interface ResourceProps {
	id: number;
	createdAt: string;
	updatedAt: string;
	title: string;
	content?: string;
	priority: number;
	status: string;
	published: boolean;
	authorId: number;
}

export type TableColumnProps = {
  key: string;
  label: string;
  render: (data: ResourceProps) => React.ReactNode;
};