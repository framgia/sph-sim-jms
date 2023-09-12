import { Moment } from "moment";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Control, Controller } from "react-hook-form";
import {
    LocalizationProvider,
    DatePicker,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { JobWithCustomerAndSchedules } from "../../types/JobRegistrationTypes";

export interface WorkScheduleFieldProps {
    index: number;
    control: Control<JobWithCustomerAndSchedules>;
    name: string;
    label: string;
    type: "date" | "time";
}

const WorkScheduleField = ({
    index,
    control,
    name,
    label,
    type,
}: WorkScheduleFieldProps) => {
    const [isClient, setIsClient] = React.useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {isClient && (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Controller
                        name={`work_schedules.${index}.${name}`}
                        control={control}
                        render={({ field: { onChange } }) => (
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                {type === "date" ? (
                                    <DatePicker
                                        label={label}
                                        onChange={(newValue: Moment | null) => {
                                            const isoDateString = newValue
                                                ? newValue.toISOString()
                                                : null;
                                            onChange(isoDateString);
                                        }}
                                    />
                                ) : (
                                    <TimePicker
                                        label={label}
                                        onChange={(newValue: Moment | null) => {
                                            const isoDateString = newValue
                                                ? newValue.toISOString()
                                                : null;
                                            onChange(isoDateString);
                                        }}
                                    />
                                )}
                            </LocalizationProvider>
                        )}
                    />
                </LocalizationProvider>
            )}
        </Box>
    );
};
export default WorkScheduleField;
