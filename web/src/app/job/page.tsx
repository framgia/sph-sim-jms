'use client';

import Pagination from '@/components/molecules/Pagination';
import StatusDisplay from '@/components/molecules/StatusDisplay';
import JobListTable from '@/components/organisms/JobListTable';
import SearchFilterHeader from '@/components/organisms/SearchFilterHeader';
import { JobColumns } from '@/utils/constants/jobTableData';
import { Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { JobListContext, JobQueryContext } from './context';
import { useHooks } from './hooks';

const JobList = (): JSX.Element => {
  const {
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
    setSearch
  } = useHooks();

  return (
    <main>
      <JobListContext.Provider value={{ columns: JobColumns, data: jobs }}>
        <JobQueryContext.Provider
          value={{
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
            setSearch
          }}>
          {isLoading ? (
            <StatusDisplay isLoading={isLoading} />
          ) : error ? (
            <StatusDisplay error={error} />
          ) : (
            <Grid
              container
              sx={{
                padding: 3,
                gap: 3,
                flexDirection: 'column'
              }}>
              <Grid item>
                <SearchFilterHeader />
              </Grid>
              {!count ? (
                <Grid
                  item
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh'
                  }}>
                  <Typography variant='label1r'>No jobs found</Typography>
                </Grid>
              ) : (
                <Fragment>
                  <Grid item>
                    <JobListTable />
                  </Grid>
                  <Grid item sx={{ alignSelf: 'center' }}>
                    <Pagination
                      count={pageCount}
                      page={page}
                      onChange={setPage}
                    />
                  </Grid>
                </Fragment>
              )}
            </Grid>
          )}
        </JobQueryContext.Provider>
      </JobListContext.Provider>
    </main>
  );
};

export default JobList;
