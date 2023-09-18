import { formatEnum, useJobQueryContext } from '@/app/job/hooks';
import { TagsEnum } from '@/utils/constants/tagsEnum';

import { SelectChangeEvent } from '@mui/material';

export const useHooks = () => {
    const { tag, setTag } = useJobQueryContext();

	const handleChange = (e: SelectChangeEvent) => {
		setTag(e.target.value);
	};

    const tagOptions = Object.keys(TagsEnum).map((key) => {
        return {
            value: TagsEnum[key as keyof typeof TagsEnum],
            name: formatEnum(key)
        }
    });
    
    return {
        tag,
        tagOptions,
        handleChange
    };
};
