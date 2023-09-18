import styles from '@/styles/Filter.module.css';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useHooks } from './hooks';

const EstimationStatusFilter = () => {
	const { status, statusOptions, handleChange } = useHooks();

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
				<MenuItem key={'clear'} value={''}>
					<em>None</em>
				</MenuItem>
				{statusOptions.map((status, key) => (
					<MenuItem key={key} value={status.value}>
						{status.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default EstimationStatusFilter;
