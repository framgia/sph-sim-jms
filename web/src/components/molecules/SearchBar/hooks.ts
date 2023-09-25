import { ChangeEvent, useState } from 'react';

export const useHooks = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return {
    searchKeyword,
    handleSearch
  };
};
