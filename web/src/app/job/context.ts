import { JobQuery, JobTable } from '@/utils/types/job';
import { createContext } from 'react';

export const JobListContext = createContext<JobTable | undefined>(undefined);
export const JobQueryContext = createContext<JobQuery | undefined>(undefined);
