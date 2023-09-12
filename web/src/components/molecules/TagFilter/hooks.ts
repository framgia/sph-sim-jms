import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

export const useHooks = () => {
    const [tag, setTag] = useState('');

	const handleChange = (e: SelectChangeEvent) => {
		setTag(e.target.value);
	};
    
    return {
        tag,
        handleChange
    };
};
