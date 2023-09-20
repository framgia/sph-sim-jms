import { Moment } from 'moment';
import { useState } from 'react';

export const useHooks = () => {
	const [startDate, setStartDate] = useState<Moment | null>();
	const [endDate, setEndDate] = useState<Moment | null>();

	const handleStartDateChange = (date: Moment | null): void => {
		setStartDate(date);
	};

	const handleEndDateChange = (date: Moment | null): void => {
		setEndDate(date);
	};

	return {
		startDate,
		handleStartDateChange,
		endDate,
		handleEndDateChange
	};
};
