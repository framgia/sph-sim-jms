import { Test, TestingModule } from '@nestjs/testing';
import MeiliSearch from 'meilisearch';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let searchService: SearchService;

  const mockMeiliSearch = {
    search: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: MeiliSearch,
          useValue: mockMeiliSearch
        }
      ],
    }).compile();

    searchService = module.get<SearchService>(SearchService);
  });

  describe('searchAndFilter', () => {
    it('should return a list of jobs based on the search query', async () => {
      const query = { page: 1, perPage: 2, tag: null, status: null, startDate: null, endDate: null, search: 'A' }
      const mockResults = {
        hits: [
          {
            id: 1,
            title: "Job A",
            type: "Type A",
            tags: null,
            remarks: null,
            customerId: 1,
            paymentMethod: null,
            userId: 1,
            pipelinePhase: null,
            createdAt: new Date("2023-09-07T09:38:42.296Z"),
            updatedAt: new Date("2023-09-07T09:38:42.296Z"),
            estimation: {
              status: null,
              totalCost: 1000.00
            }
          },
        ],
        totalHits: 1
      }

      const mockSearch = mockMeiliSearch.search.mockResolvedValue(mockResults)

      jest.spyOn(searchService, 'searchAndFilter').mockImplementation(mockSearch);

      const results = await searchService.searchAndFilter(query);

      expect(searchService.searchAndFilter).toHaveBeenCalledWith(query);
      expect(results).toEqual(mockResults);
    });
  })
});
