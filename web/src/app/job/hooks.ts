import { JobTable } from '@/utils/types/job';
import { useContext, useState } from 'react';
import { JobListContext } from './context';

export const useJobListContext = (): JobTable => {
    const jobs = useContext(JobListContext);

    if (jobs === undefined) {
        throw new Error('Missing JobListContext');
    }

    return jobs;
};

export const useHooks = () => {
    const [page, setPage] = useState(1);

	return {        
        page,
        setPage
    };
};
