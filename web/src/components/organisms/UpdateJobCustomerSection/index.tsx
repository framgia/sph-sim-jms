import EditIcon from "@mui/icons-material/Edit";
import React, { FC, useRef, useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import {
  handleCancel,
  handleInputChange,
  handleInputProps,
  handleSave,
} from "./hooks";
import { useJobDetailContext } from "@/app/job/detail/context";

const JobCustomerSection: FC = () => {
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);

  const {
    formValues,
    setFormValues,
    setButtonState,
    customerDetails,
    setCustomerDetails,
  } = useJobDetailContext();

  useEffect(() => {
    if (editEnabled && firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, [editEnabled]);

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
      <Typography variant="h4">
        Customer Registration
        {!editEnabled && (
          <EditIcon
            fontSize="small"
            style={{ marginLeft: "4px", cursor: "pointer" }}
            onClick={() => setEditEnabled(!editEnabled)}
          />
        )}
      </Typography>

      <Box sx={{ display: "flex", gap: "8px" }}>
        <TextField
          id="first-name"
          label="First Name *"
          variant="outlined"
          name="firstName"
          size="medium"
          fullWidth
          value={customerDetails.firstName}
          InputProps={handleInputProps(editEnabled)}
          inputRef={firstNameRef}
          onChange={(e) =>
            handleInputChange(e, customerDetails, setCustomerDetails)
          }
        />
        <TextField
          id="last-name"
          label="Last Name *"
          variant="outlined"
          name="lastName"
          size="medium"
          fullWidth
          value={customerDetails.lastName}
          InputProps={handleInputProps(editEnabled)}
          onChange={(e) =>
            handleInputChange(e, customerDetails, setCustomerDetails)
          }
        />
      </Box>
      <Box sx={{ display: "flex", gap: "8px" }}>
        <TextField
          id="contact"
          label="Contact Number *"
          variant="outlined"
          name="contact"
          size="medium"
          fullWidth
          value={customerDetails.contact}
          InputProps={handleInputProps(editEnabled)}
          onChange={(e) =>
            handleInputChange(e, customerDetails, setCustomerDetails)
          }
        />
        <TextField
          id="email"
          label="Email *"
          variant="outlined"
          name="email"
          size="medium"
          fullWidth
          value={customerDetails.email}
          InputProps={handleInputProps(editEnabled)}
          onChange={(e) =>
            handleInputChange(e, customerDetails, setCustomerDetails)
          }
        />
      </Box>
      <TextField
        id="address"
        label="Address *"
        variant="outlined"
        name="address"
        size="medium"
        fullWidth
        value={customerDetails.address}
        InputProps={handleInputProps(editEnabled)}
        onChange={(e) =>
          handleInputChange(e, customerDetails, setCustomerDetails)
        }
      />
      {editEnabled && (
        <Grid container spacing={1}>
          <Grid item>
            <Button
              onClick={() =>
                handleSave(
                  true,
                  editEnabled,
                  setEditEnabled,
                  customerDetails,
                  formValues,
                  setFormValues,
                  setButtonState
                )
              }
              variant="contained"
              color="primary"
            >
              SAVE
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() =>
                handleCancel(
                  editEnabled,
                  setEditEnabled,
                  formValues,
                  setCustomerDetails
                )
              }
              variant="outlined"
              color="secondary"
            >
              CANCEL
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default JobCustomerSection;
