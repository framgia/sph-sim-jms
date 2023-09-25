import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

export const useHooks = () => {
  const [status, setStatus] = useState('');

  const handleChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
  };

  return {
    status,
    handleChange
  };
};
