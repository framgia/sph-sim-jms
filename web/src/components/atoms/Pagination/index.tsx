import { Pagination as MUIPagination } from '@mui/material';
import { FC } from 'react';

interface Props {
	count: number;
	page: number;
	onChange: (page: number) => void;
}

const Pagination: FC<Props> = ({ count, page, onChange }: Props) => {
	return (
		<MUIPagination
			size='medium'
			count={count}
			page={page}
			onChange={(e: React.ChangeEvent<unknown>, newPage: number) =>
				onChange(newPage)
			}
			color='primary'
			shape='rounded'
			showFirstButton
			showLastButton
		/>
	);
};

export default Pagination;
