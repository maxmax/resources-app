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