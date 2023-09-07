import { Chip } from '@mui/material';
import { FC } from 'react';

interface Props {
	label: string;
}

const colors: Record<string, string> = {
	'Not yet Created': '#FFB4AF',
	Making: '#FDFF8F',
	Approved: '#8AFFB2',
	'Sent to Customer': '#84C1FF',
	Closed: '#65707b33'
};

const StatusChip: FC<Props> = ({ label }) => {
	const color = colors[label] || '#65707b33';

	return (
		<Chip
			label={label}
			sx={{
				backgroundColor: color,
				typography: 'label1r'
			}}
		/>
	);
};

export default StatusChip;
