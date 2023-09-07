import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent
} from '@mui/material';
import { useState } from 'react';
import styles from 'styles/Filter.module.css';

const tags = [
	{ id: 1, value: 'TAG_A', name: 'Tag A' },
	{ id: 2, value: 'TAG_B', name: 'Tag B' },
	{ id: 3, value: 'TAG_C', name: 'Tag C' }
];

const TagFilter = () => {
	const [tag, setTag] = useState('');

	const handleTagChange = (e: SelectChangeEvent) => {
		setTag(e.target.value);
	};

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
				onChange={handleTagChange}
				className={styles.input}>
				{tags.map((tag) => (
					<MenuItem key={tag.id} value={tag.value}>
						{tag.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default TagFilter;
