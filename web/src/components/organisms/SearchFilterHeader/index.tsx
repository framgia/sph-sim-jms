'use-client';

import { FilterCog } from '@/assets/icons/FilterCog';
import { FilterRemove } from '@/assets/icons/FilterRemove';
import styles from '@/styles/Filter.module.css';
import TableRows from '@mui/icons-material/TableRows';
import { Box, Button, Collapse } from '@mui/material';
import CreateDateRangeFilter from '../../molecules/CreatedDateRangeFilter';
import EstimationStatusFilter from '../../molecules/EstimationStatusFilter';
import SearchBar from '../../molecules/SearchBar';
import TagFilter from '../../molecules/TagFilter';
import { useHooks } from './hooks';

const SearchFilterHeader = (): JSX.Element => {
  const { isExpanded, toggleFilters } = useHooks();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: 3
        }}>
        <SearchBar />
        <Button
          variant='contained'
          className={`${styles.button} ${isExpanded ? styles.active : ''}`}
          onClick={toggleFilters}>
          {isExpanded ? (
            <FilterRemove style={styles.iconWhite} />
          ) : (
            <FilterCog style={styles.icon} />
          )}
        </Button>
        <Button variant='contained' className={styles.button}>
          <TableRows className={styles.icon} />
        </Button>
      </Box>
      <Collapse in={isExpanded}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            marginTop: 2
          }}>
          <TagFilter />
          <EstimationStatusFilter />
          <CreateDateRangeFilter />
        </Box>
      </Collapse>
    </Box>
  );
};

export default SearchFilterHeader;
