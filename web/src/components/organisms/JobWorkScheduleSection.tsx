"use client";

import React, { FC } from "react";
import { Moment } from "moment";

import { Box, Button, IconButton, Typography } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const JobWorkScheduleSection: FC = () => {
    const [startDate, setStartDate] = React.useState<Moment | null>(null);
    const [startTime, setStartTime] = React.useState<Moment | null>(null);
    const [endDate, setEndDate] = React.useState<Moment | null>(null);
    const [endTime, setEndTime] = React.useState<Moment | null>(null);

    const updateStartDate = (newStartDate: Moment | null): void => {
        setStartDate(newStartDate);
    };

    const updateStartTime = (newStartTime: Moment | null): void => {
        setStartTime(newStartTime);
    };

    const updateEndDate = (newEndDate: Moment | null) => {
        setEndDate(newEndDate);
    };

    const updateEndTime = (newEndTime: Moment | null) => {
        setEndTime(newEndTime);
    };

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

            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker value={startDate} onChange={updateStartDate} />
                    <TimePicker value={startTime} onChange={updateStartTime} />
                    <DatePicker value={endDate} onChange={updateEndDate} />
                    <TimePicker value={endTime} onChange={updateEndTime} />
                    <IconButton
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "40px",
                            height: "40px",
                        }}
                    >
                        <CloseOutlined fontSize="inherit" />
                    </IconButton>
                </LocalizationProvider>
            </Box>
            
            <Box>
                <Button variant="contained" color="secondary" size="medium">
                    Add Schedule
                </Button>
            </Box>
        </Box>
    );
};

export default JobWorkScheduleSection;
