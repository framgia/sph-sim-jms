import React, { FC } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { JobWithCustomerAndSchedules } from "../../types/JobRegistrationTypes";

const JobCustomerSection: FC<{
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
            <Typography variant="h4">Customer Registration</Typography>
            <Box sx={{ display: "flex", gap: "8px" }}>
                <TextField
                    {...register("customer_registration.firstName")}
                    id="first-name"
                    label="First Name *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    error={!!errors.customer_registration?.firstName}
                    helperText={
                        errors.customer_registration?.firstName &&
                        errors.customer_registration?.firstName.message
                    }
                />
                <TextField
                    {...register("customer_registration.lastName")}
                    id="last-name"
                    label="Last Name *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    error={!!errors.customer_registration?.lastName}
                    helperText={
                        errors.customer_registration?.lastName &&
                        errors.customer_registration?.lastName.message
                    }
                />
            </Box>
            <Box sx={{ display: "flex", gap: "8px" }}>
                <TextField
                    {...register("customer_registration.contact")}
                    id="contact"
                    label="Contact Number *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    error={!!errors.customer_registration?.contact}
                    helperText={
                        errors.customer_registration?.contact &&
                        errors.customer_registration?.contact.message
                    }
                />
                <TextField
                    {...register("customer_registration.email")}
                    id="email"
                    label="Email *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    error={!!errors.customer_registration?.email}
                    helperText={
                        errors.customer_registration?.email &&
                        errors.customer_registration?.email.message
                    }
                />
            </Box>
            <TextField
                {...register("customer_registration.address")}
                id="address"
                label="Address *"
                variant="outlined"
                size="medium"
                fullWidth
                error={!!errors.customer_registration?.address}
                helperText={
                    errors.customer_registration?.address &&
                    errors.customer_registration?.address.message
                }
            />
        </Box>
    );
};

export default JobCustomerSection;
