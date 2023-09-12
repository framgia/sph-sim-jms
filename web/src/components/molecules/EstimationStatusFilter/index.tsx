import styles from '@/styles/Filter.module.css';
import { EstimationStatus } from '@/utils/constants/estimationStatus';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useHooks } from './hooks';

const EstimationStatusFilter = () => {
	const { status, handleChange } = useHooks();

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
				onChange={handleChange}
				className={styles.input}>
				{EstimationStatus.map((status) => (
					<MenuItem key={status.id} value={status.status}>
						{status.status}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default EstimationStatusFilter;
