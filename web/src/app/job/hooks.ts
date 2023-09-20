import { useState } from 'react';

export const useHooks = () => {
	const [page, setPage] = useState(1);

	return {
		page,
		setPage
	};
};
