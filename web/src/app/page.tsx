'use client';

import Pagination from '@/components/atoms/Pagination';
import JobListTable from '@/components/organisms/JobListTable';
import SearchFilterHeader from '@/components/organisms/SearchFilterHeader';
import { Grid } from '@mui/material';
import { useState } from 'react';

export interface Column {
	key: string;
	label: string;
	width?: number;
}

interface Estimation {
	status: string;
	cost: number;
}

export interface JobData {
	id: number;
	title: string;
	customer: string;
	tags: Array<string>;
	schedules: Array<string>;
	estimation: Estimation;
	personInCharge: string;
	pipelinePhase: string;
	createdAt: string;
	[key: string]: string | number | string[] | Estimation;
}

const columns: Column[] = [
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

export default function JobList() {
	const [page, setPage] = useState(1);

	const handlePageChange = (value: number) => {
		setPage(value);
	};
	return (
		<main>
			<Grid
				container
				sx={{
					padding: 3,
					gap: 3,
					flexDirection: 'column'
				}}>
				<Grid item>
					<SearchFilterHeader />
				</Grid>
				<Grid item>
					<JobListTable columns={columns} data={data} />
				</Grid>
				<Grid item sx={{ alignSelf: 'center' }}>
					<Pagination
						count={12}
						page={page}
						onChange={handlePageChange}
					/>
				</Grid>
			</Grid>
		</main>
	);
}

const data: JobData[] = [
	{
		id: 1,
		title: 'New Summit',
		customer: 'John Doe',
		tags: ['Tag A', 'Tag B'],
		schedules: ['5-25-2023 5:00 - 15:00'],
		estimation: {
			status: 'Approved',
			cost: 650.0
		},
		personInCharge: 'Michael Murry',
		pipelinePhase: 'Delivery',
		createdAt: new Date('5-2-2023').toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
	},
	{
		id: 2,
		title: 'New Summit',
		customer: 'John Doe',
		tags: ['Tag A', 'Tag B', 'Tag C', 'Tag D', 'Tag E'],
		schedules: ['5-25-2023 5:00 - 15:00', '5-26-2023 5:00 - 15:00'],
		estimation: {
			status: 'Making',
			cost: 650.0
		},
		personInCharge: 'Michael Murry',
		pipelinePhase: 'Delivery',
		createdAt: new Date('5-2-2023').toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
	},
	{
		id: 3,
		title: 'New Summit',
		customer: 'John Doe',
		tags: ['Tag A'],
		schedules: ['5-25-2023 5:00 - 15:00'],
		estimation: {
			status: 'Sent to Customer',
			cost: 650.0
		},
		personInCharge: 'Michael Murry',
		pipelinePhase: 'Delivery',
		createdAt: new Date('5-2-2023').toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
	},
	{
		id: 4,
		title: 'New Summit',
		customer: 'John Doe',
		tags: ['Tag A', 'Tag B'],
		schedules: ['5-25-2023 5:00 - 15:00'],
		estimation: {
			status: 'Closed',
			cost: 650.0
		},
		personInCharge: 'Michael Murry',
		pipelinePhase: 'Delivery',
		createdAt: new Date('5-2-2023').toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
	},
	{
		id: 5,
		title: 'New Summit',
		customer: 'John Doe',
		tags: ['Tag A', 'Tag B'],
		schedules: [
			'5-25-2023 5:00 - 15:00',
			'5-26-2023 5:00 - 15:00',
			'5-26-2023 5:00 - 15:00'
		],
		estimation: {
			status: 'Not yet Created',
			cost: 650.0
		},
		personInCharge: 'Michael Murry',
		pipelinePhase: 'Delivery',
		createdAt: new Date('5-2-2023').toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
	},
	{
		id: 6,
		title: 'New Summit',
		customer: 'John Doe',
		tags: ['Tag A'],
		schedules: ['5-25-2023 5:00 - 15:00'],
		estimation: {
			status: 'Not yet Created',
			cost: 650.0
		},
		personInCharge: 'Michael Murry',
		pipelinePhase: 'Delivery',
		createdAt: new Date('5-2-2023').toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
	},
	{
		id: 7,
		title: 'New Summit',
		customer: 'John Doe',
		tags: ['Tag A'],
		schedules: ['5-25-2023 5:00 - 15:00'],
		estimation: {
			status: 'Not yet Created',
			cost: 650.0
		},
		personInCharge: 'Michael Murry',
		pipelinePhase: 'Delivery',
		createdAt: new Date('5-2-2023').toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
	},
	{
		id: 8,
		title: 'New Summit',
		customer: 'John Doe',
		tags: ['Tag A'],
		schedules: ['5-25-2023 5:00 - 15:00'],
		estimation: {
			status: 'Not yet Created',
			cost: 650.0
		},
		personInCharge: 'Michael Murry',
		pipelinePhase: 'Delivery',
		createdAt: new Date('5-2-2023').toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
	},
	{
		id: 9,
		title: 'New Summit',
		customer: 'John Doe',
		tags: ['Tag A'],
		schedules: ['5-25-2023 5:00 - 15:00'],
		estimation: {
			status: 'Not yet Created',
			cost: 650.0
		},
		personInCharge: 'Michael Murry',
		pipelinePhase: 'Delivery',
		createdAt: new Date('5-2-2023').toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
	},
	{
		id: 10,
		title: 'New Summit',
		customer: 'John Doe',
		tags: ['Tag A'],
		schedules: ['5-25-2023 5:00 - 15:00'],
		estimation: {
			status: 'Not yet Created',
			cost: 650.0
		},
		personInCharge: 'Michael Murry',
		pipelinePhase: 'Delivery',
		createdAt: new Date('5-2-2023').toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
	}
];
