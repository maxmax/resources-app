export interface TaskProps {
	id: number;
	createdAt: string;
	updatedAt: string;
	title: string;
	content?: string;
	priority: number;
	status: string;
	start: string;
	end: string;
	resourceId: number;
	authorId: number;
}

export interface UpdateTaskProps {
	title: string;
	content: string;
	start: string;
	end: string;
	status: string;
}

export interface CreateTaskProps {
	title: string;
	content?: string;
	start: string;
	end: string;
	status: string;
	priority: number;
	resourceId: number;
	authorEmail: string;
}