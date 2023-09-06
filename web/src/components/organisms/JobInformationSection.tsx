import React, { FC } from "react";
import {
    Box,
    TextField,
    Typography,
} from "@mui/material";

import ModeOfPaymentsRadioGroup from "../molecules/ModeOfPaymentsRadioGroup";
import PersonInChargeSelectDropdown from "../molecules/PersonInChargeSelectDropdown";
import TagsMultiSelectDropdown from "../molecules/TagsMultiSelectDropdown";

const JobInformationSection: FC = () => {
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
                id="job-title"
                label="Job Title *"
                variant="outlined"
                size="medium"
                fullWidth
            />

            <Box sx={{ display: "flex", gap: "8px" }}>
                <TextField
                    id="job-type"
                    label="Job Type *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                />
                <PersonInChargeSelectDropdown />
            </Box>

            <TagsMultiSelectDropdown />

            <TextField
                id="remarks"
                label="Remarks"
                fullWidth
                multiline
                rows={4}
            />

            <ModeOfPaymentsRadioGroup />
        </Box>
    );
};

export default JobInformationSection;
