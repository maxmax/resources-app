import { TaskProps } from '@/utils/api/tasks';

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
	tasks: TaskProps[];
}

export interface CreateResourceProps {
	title: string;
	content?: string;
	priority: number;
	status: string;
	published: boolean;
	authorEmail: string;
}

export interface UpdateResourceProps {
	title: string;
	content?: string;
	priority: number;
	status: string;
	published: boolean;
}