import { formatEnum, useJobQueryContext } from '@/app/job/hooks';
import { EstimationStatusEnum } from '@/utils/constants/estimationStatusEnum';
import { SelectChangeEvent } from '@mui/material';

export const useHooks = () => {
	const { status, setStatus } = useJobQueryContext();

	const handleChange = (e: SelectChangeEvent) => {
		setStatus(e.target.value);
	};

	const statusOptions = Object.keys(EstimationStatusEnum).map((key) => {
        return {
            value: EstimationStatusEnum[key as keyof typeof EstimationStatusEnum],
            name: formatEnum(key)
        }
    });

	return {
		status,
		statusOptions,
		handleChange
	};
};
