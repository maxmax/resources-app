export interface ResourcesProps {
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