'use-client';

import { FilterCog } from '@/assets/icons/FilterCog';
import { FilterRemove } from '@/assets/icons/FilterRemove';
import SelectDropdown from '@/components/molecules/SelectDropdown';
import styles from '@/styles/Filter.module.css';
import TableRows from '@mui/icons-material/TableRows';
import { Box, Button, Collapse } from '@mui/material';
import DateRangeField from '../../molecules/DateRangeField';
import SearchBar from '../../molecules/SearchBar';
import { useHooks } from './hooks';

const SearchFilterHeader = (): JSX.Element => {
  const {
    isExpanded,
    toggleFilters,
    tag,
    tagOptions,
    handleTagChange,
    status,
    handleStatusChange,
    statusOptions,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    search,
    handleSearch
  } = useHooks();

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
        <SearchBar
          value={search}
          label='Search Job'
          handleSearch={handleSearch}
        />
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
          <SelectDropdown
            label='Tags'
            name='tag'
            value={tag}
            options={tagOptions}
            handleChange={handleTagChange}
            clearable={true}
          />
          <SelectDropdown
            label='Estimation Status'
            name='estimation-status'
            value={status}
            options={statusOptions}
            handleChange={handleStatusChange}
            clearable={true}
            width={200}
          />
          <DateRangeField
            label={'Created at'}
            disableFuture
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </Box>
      </Collapse>
    </Box>
  );
};

export default SearchFilterHeader;
