import { Injectable } from '@nestjs/common';
import { Job } from '@prisma/client';
import { EnqueuedTask, Index, MeiliSearch, SearchResponse } from 'meilisearch';
import { JobQueryDto } from 'src/api/jobs/dto/job-query.dto';

@Injectable()
export class SearchService {
    private searchClient: MeiliSearch;

  constructor() {
    this.searchClient = new MeiliSearch({
      host: 'http://meilisearch:7700',
    })

    this.initIndex();
  }

  private async initIndex(): Promise<void> {
    try {
      await this.searchClient.createIndex('jobs', { primaryKey: 'id' });

      const index = this.searchClient.index('jobs');
      await index.updateSettings({
        searchableAttributes: ['title'],
        filterableAttributes: ['tags', 'estimation.status', 'createdAtUnix'],
        typoTolerance: {
          enabled: false
        },
        rankingRules: [
          'words',
          'proximity',
          'exactness',
        ],
      })
    } catch(e) {
      console.log('Error initializing index', e);
      throw e;
    }
  }

  private getIndex(): Index {
    return this.searchClient.index('jobs');
  }

  async addDocuments(docs: Job[]): Promise<EnqueuedTask> {   
    const index = this.getIndex();
    
    try {
      return await index.addDocuments(docs);
    } catch(e) {
      console.log('Error adding documents');
      throw e;
    }
  }

  async searchAndFilter(query: JobQueryDto): Promise<SearchResponse> {
    const index = this.getIndex();
    
    const { perPage = 12, page, search, tag, status, startDate, endDate } = query;

    const tagFilter = tag ? `tags = ${tag}` : '';
    const statusFilter = status ? `estimation.status = ${status}` : '';
    const dateFilter = (startDate && endDate) ? `createdAtUnix >= ${startDate} AND createdAtUnix <= ${endDate}` : '';

    const results = await index.search(
      search,
      {
        attributesToHighlight: ['title'],
        filter: [tagFilter, statusFilter, dateFilter],
        hitsPerPage: perPage,
        page
      }
    );

    return results;
  }
}
