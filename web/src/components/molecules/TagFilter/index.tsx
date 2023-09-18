import styles from '@/styles/Filter.module.css';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useHooks } from './hooks';

const TagFilter = () => {
	const { tag, tagOptions, handleChange } = useHooks();

	return (
		<FormControl sx={{ width: 180 }}>
			<InputLabel size='small' id='tag-label'>
				Tag
			</InputLabel>
			<Select
				size='small'
				labelId='tag-label'
				name='tag'
				value={tag}
				label='Tag'
				color='secondary'
				onChange={handleChange}
				className={styles.input}>
				<MenuItem key={'clear'} value={''}>
					<em>None</em>
				</MenuItem>
				{tagOptions.map((tag, key) => (
					<MenuItem key={key} value={tag.value}>
						{tag.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default TagFilter;
