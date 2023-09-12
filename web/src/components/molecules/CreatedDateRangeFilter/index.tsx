'use-client';

import styles from '@/styles/Filter.module.css';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useHooks } from './hooks';

const CreateDateRangeFilter = () => {
	const { startDate, handleStartDateChange, endDate, handleEndDateChange } =
		useHooks();

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<DatePicker
					label='Created at - Start Date'
					value={startDate}
					onChange={handleStartDateChange}
					className={styles.input}
					slotProps={{
						textField: {
							size: 'small',
							color: 'secondary',
							id: 'created-start',
							name: 'created-start'
						}
					}}
				/>
				{' - '}
				<DatePicker
					label='Created at - End Date'
					value={endDate}
					onChange={handleEndDateChange}
					className={styles.input}
					slotProps={{
						textField: {
							size: 'small',
							color: 'secondary',
							id: 'created-end',
							name: 'created-end'
						}
					}}
				/>
			</LocalizationProvider>
		</Box>
	);
};

export default CreateDateRangeFilter;
