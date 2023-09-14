import { FC, useRef, useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  handleSave,
  handleEdit,
  handleInputChange,
  handleInputProps,
} from "./hooks";
import React from "react";
import { CustomerFormType } from "@/utils/interfaces";
import { initialFormValues } from "@/utils/constants/JobCustomerDummyValues";

type Props = {
  onCustomerData: (data: CustomerFormType) => void;
};

const JobCustomerSection: FC<Props> = ({ onCustomerData }) => {
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [formValues, setFormValues] = useState(initialFormValues);

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
            onClick={() => handleEdit(editEnabled, setEditEnabled)}
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
          defaultValue={formValues.firstName}
          InputProps={handleInputProps(editEnabled)}
          inputRef={firstNameRef}
          onChange={(e) => handleInputChange(e, formValues, setFormValues)}
        />
        <TextField
          id="last-name"
          label="Last Name *"
          variant="outlined"
          name="lastName"
          size="medium"
          fullWidth
          defaultValue={formValues.lastName}
          InputProps={handleInputProps(editEnabled)}
          onChange={(e) => handleInputChange(e, formValues, setFormValues)}
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
          defaultValue={formValues.contact}
          InputProps={handleInputProps(editEnabled)}
          onChange={(e) => handleInputChange(e, formValues, setFormValues)}
        />
        <TextField
          id="email"
          label="Email *"
          variant="outlined"
          name="email"
          size="medium"
          fullWidth
          defaultValue={formValues.email}
          InputProps={handleInputProps(editEnabled)}
          onChange={(e) => handleInputChange(e, formValues, setFormValues)}
        />
      </Box>
      <TextField
        id="address"
        label="Address *"
        variant="outlined"
        name="address"
        size="medium"
        fullWidth
        defaultValue={formValues.address}
        InputProps={handleInputProps(editEnabled)}
        onChange={(e) => handleInputChange(e, formValues, setFormValues)}
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
                  formValues,
                  onCustomerData
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
                handleSave(
                  false,
                  editEnabled,
                  setEditEnabled,
                  formValues,
                  onCustomerData
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
