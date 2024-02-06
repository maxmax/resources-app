export interface UserProps {
  id: number;
  email: string;
  name: string;
}

export type TableColumnProps = {
  key: string;
  label: string;
  render: (data: UserProps) => React.ReactNode;
};
