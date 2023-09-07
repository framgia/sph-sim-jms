import { Pagination as MUIPagination } from '@mui/material';
import { FC } from 'react';

interface Props {
	count: number;
	page: number;
	onChange: (page: number) => void;
}

const Pagination: FC<Props> = ({ count = 12, page = 1, onChange }: Props) => {
	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		newPage: number
	) => {
		onChange(newPage);
	};

	return (
		<MUIPagination
			size='medium'
			count={count}
			page={page}
			onChange={handlePageChange}
			color='primary'
			shape='rounded'
			showFirstButton
			showLastButton
		/>
	);
};

export default Pagination;
