import { useJobQueryContext } from '@/app/job/hooks';
import { type Moment } from 'moment';
import { useEffect, useState } from 'react';

export const useHooks = () => {
    const { setStartDate, setEndDate } = useJobQueryContext();
    const [initialStartDate, setInitialStartDate] = useState<Moment | null>(null);
    const [initialEndDate, setInitialEndDate] = useState<Moment | null>(null);
    const [error, setError] = useState('');

    const handleStartDateChange = (date: Moment | null): void => {
		setInitialStartDate(date);
	};

	const handleEndDateChange = (date: Moment | null): void => {
		setInitialEndDate(date);
	};

    useEffect(() => {
        if (initialStartDate && !initialEndDate || initialEndDate && !initialStartDate) {
            setError('Both start and end dates must be set');
        }

        if(!initialStartDate && !initialEndDate) {
            setError('');
            setStartDate(null);
            setEndDate(null);
        }

        if (initialStartDate && initialEndDate) {
            if (initialEndDate < initialStartDate) {
                setError('Please set a vaild date');
            } else {
                setError('');
                setStartDate(initialStartDate);
                setEndDate(initialEndDate);
            }
        }
    }, [initialStartDate, initialEndDate]);

    return {
        error,
        initialStartDate,
        handleStartDateChange,
        initialEndDate,
        handleEndDateChange,
    };
};
