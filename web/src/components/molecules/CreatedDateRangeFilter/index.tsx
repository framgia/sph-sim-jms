'use-client';

import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useHooks } from './hooks';

const CreateDateRangeFilter = () => {
	const {
		error,
		initialStartDate,
		handleStartDateChange,
		initialEndDate,
		handleEndDateChange
	} = useHooks();

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<DatePicker
					disableFuture
					label='Created at - Start Date'
					value={initialStartDate}
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
						actionBar: {
							actions: ['clear']
						},
						textField: {
							size: 'small',
							color: 'secondary',
							id: 'created-start',
							name: 'created-start',
							error: !!error,
							helperText: error
						}
					}}
				/>
				<DatePicker
					disableFuture
					label='Created at - End Date'
					value={initialEndDate}
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
						actionBar: {
							actions: ['clear']
						},
						textField: {
							size: 'small',
							color: 'secondary',
							id: 'created-end',
							name: 'created-end',
							error: !!error,
							helperText: error
						}
					}}
				/>
			</LocalizationProvider>
		</Box>
	);
};

export default CreateDateRangeFilter;
