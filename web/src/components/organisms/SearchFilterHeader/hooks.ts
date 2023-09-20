import { useState } from 'react';

export const useHooks = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };

  return {
    isExpanded,
    toggleFilters
  };
};
