import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
	isLoading?: boolean;
	error?: string;
}

const StatusDisplay = ({ isLoading = false, error }: Props): JSX.Element => {
	return (
		<Box
			sx={{
				display: 'flex',

				justifyContent: 'center',
				alignItems: 'center',
				height: '90vh'
			}}>
			{isLoading ? (
				<CircularProgress />
			) : (
				error && <Typography variant='label1r'>{error}</Typography>
			)}
		</Box>
	);
};

export default StatusDisplay;
