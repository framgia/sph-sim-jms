"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";

import JobCustomerSection from "../../components/organisms/JobCustomerSection";
import JobInformationSection from "../../components/organisms/JobInformationSection";
import JobWorkScheduleSection from "../../components/organisms/JobWorkScheduleSection";
import {
    JobWithCustomerAndSchedules,
    JobWithCustomerAndSchedulesSchema,
} from "../../types/JobRegistrationTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios_instance from "../../utils/axiosInstance";

export default function Job() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<JobWithCustomerAndSchedules>({
        defaultValues: {
            customer_registration: {
                firstName: "",
                lastName: "",
                contact: "",
                email: "",
                address: "",
            },
            job_information: {
                title: "",
                type: "",
                userId: undefined,
                tags: [],
                remarks: "",
                paymentMethod: undefined,
            },
            work_schedules: [
                {
                    startDate: undefined,
                    startTime: undefined,
                    endDate: undefined,
                    endTime: undefined,
                },
            ],
        },
        resolver: zodResolver(JobWithCustomerAndSchedulesSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "work_schedules",
    });

    const onSubmit = async (values: JobWithCustomerAndSchedules) => {
        const res = await axios_instance.post("/job", values);
        alert(`Status ${res.status}. Job successfully created.`)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    padding: "24px",
                    paddingY: "16px",
                    width: "960px",
                }}
            >
                <Typography variant="h1">Job Creation</Typography>

                <JobCustomerSection register={register} errors={errors} />
                <JobInformationSection register={register} errors={errors} />
                <JobWorkScheduleSection
                    append={append}
                    fields={fields}
                    remove={remove}
                    control={control}
                />

                <Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        SUBMIT
                    </Button>
                </Box>
            </Box>
        </form>
    );
}
