'use-client';

import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Moment } from 'moment';
import { useHooks } from './hooks';

interface Props {
  label: string;
  disableFuture?: boolean;
  startDate: Moment | null;
  endDate: Moment | null;
  setStartDate: (date: Moment | null) => void;
  setEndDate: (date: Moment | null) => void;
}

const DateRangeField = ({
  label,
  disableFuture = false,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}: Props) => {
  const { error, handleStartDateChange, handleEndDateChange } = useHooks({
    setStartDate,
    setEndDate
  });

  const sxProps = {
    '& .MuiInputBase-root': {
      backgroundColor: 'white'
    },
    '&  .MuiFormHelperText-root .Mui-error': {
      backgroundColor: 'transparent'
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          disableFuture={disableFuture}
          label={`${label} - Start Date`}
          value={startDate}
          onChange={handleStartDateChange}
          sx={sxProps}
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
        <DatePicker
          disableFuture={disableFuture}
          label={`${label} - End Date`}
          value={endDate}
          onChange={handleEndDateChange}
          sx={sxProps}
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

export default DateRangeField;
