import moment, { type Moment } from 'moment';
import { useEffect, useState } from 'react';

export const useHooks = () => {
    const [startDate, setStartDate] = useState<Moment | null>(moment().startOf('month'));
	const [endDate, setEndDate] = useState<Moment | null>(moment());
    const [isInvalidDate, setIsInvalidDate] = useState(false);

    const handleStartDateChange = (date: Moment | null): void => {
		setStartDate(date);
	};

	const handleEndDateChange = (date: Moment | null): void => {
		setEndDate(date);
	};

    useEffect(() => {
        if (startDate && endDate) {
            setIsInvalidDate(endDate <= startDate);
        }
    }, [startDate, endDate]);

    return {
        startDate,
        handleStartDateChange,
        endDate,
        handleEndDateChange,
        isInvalidDate
    };
};
