import { JobQueryContext } from '@/app/job/context';
import { EstimationStatusEnum } from '@/utils/constants/estimationStatusEnum';
import { TagsEnum } from '@/utils/constants/tagsEnum';
import { convertEnumToOptions } from '@/utils/helpers';
import { JobQuery } from '@/utils/types/job';
import { SelectChangeEvent } from '@mui/material';
import { useContext, useState } from 'react';

const useJobQueryContext = (): JobQuery => {
  const query = useContext(JobQueryContext);

  if (query === undefined) {
    throw new Error('Missing JobQueryContext');
  }

  return query;
};

export const useHooks = () => {
  const {
    isFilter,
    setIsFilter,
    tag,
    setTag,
    status,
    setStatus,
    startDate,
    endDate,
    setStartDate,
    setEndDate 
  } = useJobQueryContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
    setIsFilter(!isFilter);
  };

  const handleTagChange = (e: SelectChangeEvent) => {
    setTag(e.target.value);
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
  };

  const tagOptions = convertEnumToOptions(TagsEnum);
  const statusOptions = convertEnumToOptions(EstimationStatusEnum);

  return {
    isExpanded,
    toggleFilters,
    tag,
    handleTagChange,
    status,
    handleStatusChange,
    tagOptions,
    statusOptions,
    startDate,
    endDate,
    setStartDate,
    setEndDate
  };
};