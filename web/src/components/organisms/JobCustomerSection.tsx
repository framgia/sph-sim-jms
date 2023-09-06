import { FC } from "react";
import { Box, Typography, TextField } from "@mui/material";

const JobCustomerSection: FC = () => {
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
                    id="first-name"
                    label="First Name *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                />
                <TextField
                    id="last-name"
                    label="Last Name *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                />
            </Box>
            <Box sx={{ display: "flex", gap: "8px" }}>
                <TextField
                    id="contact"
                    label="Contact Number *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                />
                <TextField
                    id="email"
                    label="Email *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                />
            </Box>
            <TextField
                id="address"
                label="Address *"
                variant="outlined"
                size="medium"
                fullWidth
            />
        </Box>
    );
};

export default JobCustomerSection;
