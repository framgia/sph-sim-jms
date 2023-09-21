import { JobListContext } from '@/app/job/context';
import { JobTable } from '@/utils/types/job';
import { useContext } from 'react';

const useJobListContext = (): JobTable => {
  const jobs = useContext(JobListContext);

  if (jobs === undefined) {
    throw new Error('Missing JobListContext');
  }

  return jobs;
};

export const useHooks = () => {
  const { columns, data } = useJobListContext();

  return {
    columns,
    data
  };
};