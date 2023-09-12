'use client';

import Pagination from '@/components/atoms/Pagination';
import JobListTable from '@/components/organisms/JobListTable';
import SearchFilterHeader from '@/components/organisms/SearchFilterHeader';
import { JobColumns, JobData } from '@/utils/constants/jobTableData';
import { Grid } from '@mui/material';
import { JobListContext } from './context';
import { useHooks } from './hooks';

const JobList = (): JSX.Element => {
	const { page, setPage } = useHooks();

	return (
		<main>
			<JobListContext.Provider
				value={{ columns: JobColumns, data: JobData }}>
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
					<Grid item>
						<JobListTable />
					</Grid>
					<Grid item sx={{ alignSelf: 'center' }}>
						<Pagination count={12} page={page} onChange={setPage} />
					</Grid>
				</Grid>
			</JobListContext.Provider>
		</main>
	);
};

export default JobList;
