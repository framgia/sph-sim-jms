'use-client';

import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useHooks } from './hooks';

const CreateDateRangeFilter = () => {
	const {
		startDate,
		handleStartDateChange,
		endDate,
		handleEndDateChange,
		isInvalidDate
	} = useHooks();

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<DatePicker
					disableFuture
					label='Created at - Start Date'
					value={startDate}
					onChange={handleStartDateChange}
					sx={{
						'& .MuiInputBase-root': {
							backgroundColor: 'white'
						},
						'&  .MuiFormHelperText-root .Mui-error': {
							backgroundColor: 'transparent'
						}
					}}
					slotProps={{
						textField: {
							size: 'small',
							color: 'secondary',
							id: 'created-start',
							name: 'created-start',
							error: isInvalidDate,
							helperText: isInvalidDate
								? 'Please set a valid date'
								: ''
						}
					}}
				/>
				{' - '}
				<DatePicker
					disableFuture
					label='Created at - End Date'
					value={endDate}
					onChange={handleEndDateChange}
					sx={{
						'& .MuiInputBase-root': {
							backgroundColor: 'white'
						},
						'&  .MuiFormHelperText-root .Mui-error': {
							backgroundColor: 'transparent'
						}
					}}
					slotProps={{
						textField: {
							size: 'small',
							color: 'secondary',
							id: 'created-end',
							name: 'created-end',
							error: isInvalidDate,
							helperText: isInvalidDate
								? 'Please set a valid date.'
								: ''
						}
					}}
				/>
			</LocalizationProvider>
		</Box>
	);
};

export default CreateDateRangeFilter;
