import styles from '@/styles/Filter.module.css';
import SearchIcon from '@mui/icons-material/Search';
import {
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput
} from '@mui/material';
import { useHooks } from './hooks';

const SearchBar = () => {
	const { searchKeyword, handleSearch } = useHooks();

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
