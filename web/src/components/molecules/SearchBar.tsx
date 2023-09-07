import SearchIcon from '@mui/icons-material/Search';
import {
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput
} from '@mui/material';
import { useState } from 'react';
import styles from 'styles/Filter.module.css';

const SearchBar = () => {
	const [searchKeyword, setSearchKeyword] = useState('');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchKeyword(e.target.value);
	};

	return (
		<FormControl fullWidth>
			<InputLabel htmlFor='search'>Search Job</InputLabel>
			<OutlinedInput
				className={styles.input}
				id='search'
				name='search'
				label='Search Job'
				size='medium'
				color='secondary'
				autoComplete='off'
				value={searchKeyword}
				onChange={handleSearch}
				endAdornment={
					<InputAdornment position='end'>
						<SearchIcon sx={{ color: 'primary-700' }} />
					</InputAdornment>
				}
			/>
		</FormControl>
	);
};

export default SearchBar;
