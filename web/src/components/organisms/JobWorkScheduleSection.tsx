"use client";

import React, { FC } from "react";
import { CloseOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Control, FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";

import WorkScheduleField from "../molecules/WorkSchedulesField";

import { JobWithCustomerAndSchedules } from "../../types/JobRegistrationTypes";

interface JobWorkScheduleSectionProps {
    append: UseFieldArrayAppend<JobWithCustomerAndSchedules, "work_schedules">;
    fields: FieldArrayWithId<JobWithCustomerAndSchedules, "work_schedules", "id">[];
    remove: UseFieldArrayRemove;
    control: Control<JobWithCustomerAndSchedules>;
}

const JobWorkScheduleSection: FC<JobWorkScheduleSectionProps> = ({
    append,
    fields,
    remove,
    control,
}) => {
    const appendSchedule = () => {
        append({
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
        });
    };

    const removeSchedule = (index: number) => {
        if (fields.length <= 1) {
            alert("Action cannot be done.")
            return
        }

        remove(index)
        alert('Schedule deleted.')
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "16px",
                background: "white",
                borderRadius: "4px",
            }}
        >
            <Typography variant="h4">Work Schedule</Typography>

            {fields.map((field: object & { id: string }, index: number) => (
                <Box
                    key={field.id}
                    sx={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                    }}
                >
                    <WorkScheduleField
                        index={index}
                        control={control}
                        name="startDate"
                        label="Start Date"
                        type="date"
                    />
                    <WorkScheduleField
                        index={index}
                        control={control}
                        name="startTime"
                        label="Start Time"
                        type="time"
                    />
                    <WorkScheduleField
                        index={index}
                        control={control}
                        name="endDate"
                        label="End Date"
                        type="date"
                    />
                    <WorkScheduleField
                        index={index}
                        control={control}
                        name="endTime"
                        label="End Time"
                        type="time"
                    />

                    <IconButton
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "40px",
                            height: "40px",
                        }}
                        onClick={() => removeSchedule(index)}
                    >
                        <CloseOutlined fontSize="inherit" />
                    </IconButton>
                </Box>
            ))}

            <Box>
                <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={appendSchedule}
                >
                    Add Schedule
                </Button>
            </Box>
        </Box>
    );
};

export default JobWorkScheduleSection;
