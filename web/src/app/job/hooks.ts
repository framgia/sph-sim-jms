import { axiosInstance } from '@/utils/services/axios';
import { JobSchema, JobTable, JobTableRow } from '@/utils/types/job';
import { ScheduleSchema } from '@/utils/types/schedule';
import { useContext, useEffect, useState } from 'react';
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
    const [perPage] = useState(12);
    const [jobs, setJobs] = useState<JobTableRow[]>([]);
    const [count, setCount] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        axiosInstance
			.get('/jobs', {
				params: {
					page,
					perPage
				}
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
    }, [page, perPage]);

	return {        
        jobs,
        count,
        page,
        pageCount,
        isLoading,
        error,
        setPage,
    };
};

const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

const formatTime = (date: string): string => {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};

const formatSchedules = (schedules: ScheduleSchema[]): string[] => {
    const scheduleData = schedules.map((schedule: ScheduleSchema) => {
        const startDateTime = `${formatDate(schedule.startDate)} ${formatTime(schedule.startTime)}`;
        const endDateTime = `${formatTime(schedule.endTime)}`;
        return `${startDateTime} - ${endDateTime}`;
    });

    return scheduleData;
};

const formatEnum = (value: string): string => {
    let words = value.split('_');
    words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return words.join(' ');
}

const convertTableData = (data: JobSchema[]): JobTableRow[] => {
    const tableData = data.map((job: JobSchema) => ({
        id: job.id,
        title: job.title,
        customer: `${job.customer.firstName} ${job.customer.lastName}`,
        tags: job.tags.map((tag) => formatEnum(tag)).sort(),
        schedules: formatSchedules(job.schedules).sort(),
        estimation: {
            status: job.estimation?.status ? formatEnum(job.estimation?.status) : 'Not Yet Created',
            cost: job.estimation?.totalCost ? `₱ ${job.estimation?.totalCost}` : '-'
        },
        personInCharge: `${job.personInCharge.firstName} ${job.personInCharge.lastName}`,
        pipelinePhase: formatEnum(job.pipelinePhase),
        createdAt: formatDate(job.createdAt)
    }));

    return tableData;
};
