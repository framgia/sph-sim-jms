import { Job } from '@prisma/client';

export const convertToDocuments = (jobs: Job[]): Job[] => {
    const docs = jobs.map((job: Job) => {
        const date = job.createdAt
        job['createdAtUnix'] = new Date(date).getTime();
        return job;
    });

    return docs;
}
