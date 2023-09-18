import { useJobQueryContext } from '@/app/job/hooks';
import { useState } from 'react';

export const useHooks = () => {
    const { isFilter, setIsFilter } = useJobQueryContext();
    const [isExpanded, setIsExpanded] = useState(false);

	const toggleFilters = () => {
		setIsExpanded(!isExpanded);
        setIsFilter(!isFilter);
	};

    return {
        isExpanded,
        toggleFilters
    };
};
