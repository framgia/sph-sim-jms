'use-client';

import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Moment } from 'moment';
import { useState } from 'react';
import styles from 'styles/Filter.module.css';

const CreateDateRangeFilter = () => {
	const [startDate, setStartDate] = useState<Moment | null>();
	const [endDate, setEndDate] = useState<Moment | null>();

	const handleStartDateChange = (date: Moment | null): void => {
		setStartDate(date);
	};

	const handleEndDateChange = (date: Moment | null): void => {
		setEndDate(date);
	};

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
