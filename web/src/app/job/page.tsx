"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";

import JobCustomerSection from "../../components/organisms/JobCustomerSection";
import JobInformationSection from "../../components/organisms/JobInformationSection";
import JobWorkScheduleSection from "../../components/organisms/JobWorkScheduleSection";

export default function Job() {
    const handleSubmit = () => {
        console.log("submitted form");
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    paddingX: "24px",
                    paddingY: "16px",
                    width: "960px",
                }}
            >
                <Typography variant="h1">Job Creation</Typography>
                
                <JobCustomerSection />
                <JobInformationSection />
                <JobWorkScheduleSection />

                <Box>
                    <Button onClick={handleSubmit} variant="contained" color="primary" size="large">
                        SUBMIT
                    </Button>
                </Box>
            </Box>
        </form>
    );
}
