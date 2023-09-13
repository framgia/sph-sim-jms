import { CustomerSchema } from './customer';
import { EstimationSchema } from './estimation';
import { ScheduleSchema } from './schedule';
import { UserSchema } from './user';

export interface TableColumn {
	key: string;
	label: string;
	width?: number;
}

export interface EstimationType {
	status: string;
	cost: string | number;
}

export interface JobTableRow {
	id: number;
	title: string;
	customer: string;
	tags: Array<string>;
	schedules: Array<string>;
	estimation: EstimationType;
	personInCharge: string;
	pipelinePhase: string;
	createdAt: string;
	[key: string]: string | number | string[] | EstimationType;
}

export interface JobTable {
    columns: TableColumn[];
    data?: JobTableRow[];
}

export interface JobSchema {
    id: number;
    title: string;
    type: string;
    tags: string[];
    remarks?: string;
    customer: CustomerSchema;
    paymentMethod: string;
    personInCharge: UserSchema;
    schedules: ScheduleSchema[];
    estimation?: EstimationSchema;
    pipelinePhase: string;
    createdAt: string;
    updatedAt: string;
}

export interface JobListType {
    jobs: JobSchema[];
    count: number
}
