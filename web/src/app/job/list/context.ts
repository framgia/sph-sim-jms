import { JobTable } from '@/utils/types/job';
import { createContext } from 'react';

export const JobListContext = createContext<JobTable | undefined>(undefined);
