import { TableColumn } from '../types/job';

export const JobColumns : TableColumn[] = [
	{ key: 'title', label: 'Job Title', width: 200 },
	{ key: 'customer', label: 'Customer Name', width: 170 },
	{ key: 'tags', label: 'Tags', width: 160 },
	{ key: 'schedules', label: 'Work Schedule', width: 200 },
	{ key: 'estimationStatus', label: 'Estimation Status', width: 180 },
	{ key: 'personInCharge', label: 'Person in Charge', width: 170 },
	{ key: 'pipelinePhase', label: 'Pipeline Phase', width: 150 },
	{ key: 'cost', label: 'Cost', width: 120 },
	{ key: 'createdAt', label: 'Created At', width: 120 }
];
