/* eslint-disable @typescript-eslint/no-unused-vars */
import { Job } from '@prisma/client';
import { SearchResponse } from 'meilisearch';

export const convertToJobs = (results: SearchResponse): Job[] => {
    const jobs = results.hits.map((hit) => {
        const result = hit._formatted;
        const { createdAtUnix, ...job } = result;
        return job as Job;
      });
      
    return jobs;
}
