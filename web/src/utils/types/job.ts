export interface TableColumn {
	key: string;
	label: string;
	width?: number;
}

export interface EstimationType {
	status: string;
	cost: number;
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
    data: JobTableRow[];
}
