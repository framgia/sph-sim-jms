import { convertTableData } from '@/utils/helpers';
import { axiosInstance } from '@/utils/services/axios';
import { JobTableRow } from '@/utils/types/job';
import { Moment } from 'moment';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useHooks = () => {
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [jobs, setJobs] = useState<JobTableRow[]>([]);
  const [count, setCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const [isFilter, setIsFilter] = useState(false);
  const [tag, setTag] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);

  const params: {
    page: number,
    perPage: number,
    tag?: string,
    status?: string,
    startDate?: string,
    endDate?: string;
    search?: string;
  } = {
    page, perPage,
  };

  if (isFilter) {
    if (tag) {
      params.tag = tag;
    }

    if (status) {
      params.status = status;
    }

    if (startDate && endDate) {
      params.startDate = startDate.format("MM-DD-YYYY");
      params.endDate = endDate.format("MM-DD-YYYY");
    }
  }

  if (search) {
    params.search = search;
  }

  useEffect(() => {
    axiosInstance
      .get('/jobs', {
        params
      })
      .then((response) => {
        setCount(response?.data.count);
        setJobs(convertTableData(response?.data.jobs));
        setPageCount(Math.ceil(response?.data.count / perPage));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        setError('Something went wrong.');
      });
  }, [page, perPage, tag, status, startDate, endDate, isFilter, search]);

  return {
    jobs,
    count,
    page,
    pageCount,
    isLoading,
    error,
    setPage,
    tag,
    setTag,
    status,
    setStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isFilter,
    setIsFilter,
    search,
    setSearch,
  };
}
