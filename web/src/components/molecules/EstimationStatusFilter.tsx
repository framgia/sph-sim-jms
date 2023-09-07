import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent
} from '@mui/material';
import { useState } from 'react';
import styles from 'styles/Filter.module.css';

const estimationStatus = [
	{ id: 1, status: 'Not yet Created' },
	{ id: 2, status: 'Making' },
	{ id: 3, status: 'Approved' },
	{ id: 4, status: 'Sent to Customer' },
	{ id: 5, status: 'Closed' }
];

const EstimationStatusFilter = () => {
	const [status, setStatus] = useState('');

	const handleStatusChange = (e: SelectChangeEvent) => {
		setStatus(e.target.value);
	};

	return (
		<FormControl sx={{ width: 180 }}>
			<InputLabel size='small' id='estimation-status-label'>
				Estimation Status
			</InputLabel>
			<Select
				size='small'
				labelId='estimation-status-label'
				name='estimation-status'
				value={status}
				label='Estimation Status'
				color='secondary'
				onChange={handleStatusChange}
				className={styles.input}>
				{estimationStatus.map((status) => (
					<MenuItem key={status.id} value={status.status}>
						{status.status}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default EstimationStatusFilter;
