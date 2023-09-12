import React, { FC } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import TagsMultiSelectDropdown from "../molecules/TagsMultiSelectDropdown";
import ModeOfPaymentsRadioGroup from "../molecules/ModeOfPaymentsRadioGroup";
import PersonInChargeSelectDropdown from "../molecules/PersonInChargeSelectDropdown";

import { JobWithCustomerAndSchedules } from "../../types/JobRegistrationTypes";

const JobInformationSection: FC<{
    register: UseFormRegister<JobWithCustomerAndSchedules>;
    errors: FieldErrors<JobWithCustomerAndSchedules>;
}> = ({ register, errors }) => {
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
            <Typography variant="h4">Job Information</Typography>

            <TextField
                {...register("job_information.title")}
                id="job-title"
                label="Job Title *"
                variant="outlined"
                size="medium"
                fullWidth
                error={!!errors.job_information?.title}
                helperText={
                    errors.job_information?.title &&
                    errors.job_information?.title.message
                }
            />

            <Box sx={{ display: "flex", gap: "8px" }}>
                <TextField
                    {...register("job_information.type")}
                    id="job-type"
                    label="Job Type *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    error={!!errors.job_information?.type}
                    helperText={
                        errors.job_information?.type &&
                        errors.job_information?.type.message
                    }
                />
                <PersonInChargeSelectDropdown register={register} />
            </Box>

            <TagsMultiSelectDropdown register={register} />

            <TextField
                {...register("job_information.remarks")}
                id="remarks"
                label="Remarks"
                fullWidth
                multiline
                rows={4}
            />
            <ModeOfPaymentsRadioGroup register={register} />
        </Box>
    );
};

export default JobInformationSection;
