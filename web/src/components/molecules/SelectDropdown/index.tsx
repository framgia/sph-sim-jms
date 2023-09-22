import styles from '@/styles/Filter.module.css';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';

interface Props {
  label: string;
  name: string;
  value: string;
  options: Array<{ value: string; name: string }>;
  clearable?: boolean;
  width?: number;
  handleChange: (e: SelectChangeEvent) => void;
}

const SelectDropdown = ({
  label,
  name,
  value,
  options,
  handleChange,
  clearable = false,
  width = 180
}: Props) => {
  return (
    <FormControl>
      <InputLabel size='small'>{label}</InputLabel>
      <Select
        size='small'
        name={name}
        value={value}
        label={label}
        color='secondary'
        onChange={handleChange}
        className={styles.input}
        sx={{ width }}>
        {clearable && (
          <MenuItem key={'clear'} value={''}>
            <em>None</em>
          </MenuItem>
        )}
        {options.map((option, key) => (
          <MenuItem key={key} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDropdown;
