import styles from '@/styles/Filter.module.css';
import SearchIcon from '@mui/icons-material/Search';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import { ChangeEvent } from 'react';

interface Props {
  label: string;
  value: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ value, label, handleSearch }: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor='search'>{label}</InputLabel>
      <OutlinedInput
        className={styles.input}
        id='search'
        label={label}
        size='medium'
        color='secondary'
        autoComplete='off'
        value={value}
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
