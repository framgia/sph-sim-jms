import React, { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { InformationFormType } from "@/utils/interfaces";
import { initialFormValues } from "@/utils/constants/JobDetailDummyValues";

import ModeOfPaymentsRadioGroup from "../../molecules/ModeOfPaymentsRadioGroup";
import PersonInChargeSelectDropdown from "../../molecules/PersonInChargeSelectDropdown";
import {
  handleEdit,
  handleSave,
  handleTagChips,
  handleMOPChange,
  handleInputProps,
  handleInputChange,
  handlePersonInChargeChange,
} from "./hooks";

type Props = {
  onJobDetailData: (data: InformationFormType) => void;
};

const JobDetailSection: FC<Props> = ({ onJobDetailData }) => {
  const jobTitle = useRef<HTMLInputElement | null>(null);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    if (editEnabled && jobTitle.current) {
      jobTitle.current.focus();
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
        Job Information
        {!editEnabled && (
          <EditIcon
            fontSize="small"
            style={{ marginLeft: "4px", cursor: "pointer" }}
            onClick={() => handleEdit(editEnabled, setEditEnabled)}
          />
        )}
      </Typography>

      <Table sx={{ border: () => 1, borderColor: () => "light" }}>
        <TableBody>
          {/* Job Title */}
          <TableRow>
            <TableCell
              sx={{
                bgcolor: () => "background-primary",
                width: () => "25%",
              }}
            >
              <Typography variant="label2b"> Job Title </Typography>
            </TableCell>
            <TableCell>
              {!editEnabled ? (
                <Typography variant="body2b">{formValues.jobTitle}</Typography>
              ) : (
                <TextField
                  variant="outlined"
                  size="medium"
                  name="jobTitle"
                  fullWidth
                  defaultValue={formValues.jobTitle}
                  InputProps={handleInputProps(editEnabled)}
                  inputRef={jobTitle}
                  onChange={(e) =>
                    handleInputChange(e, formValues, setFormValues)
                  }
                />
              )}
            </TableCell>
          </TableRow>
          {/* Job Type */}
          <TableRow>
            <TableCell
              sx={{
                bgcolor: () => "background-primary",
                width: () => "25%",
              }}
            >
              <Typography variant="label2b"> Job Type </Typography>
            </TableCell>
            <TableCell>
              {!editEnabled ? (
                <Typography variant="body2b">{formValues.jobType}</Typography>
              ) : (
                <TextField
                  variant="outlined"
                  size="medium"
                  name="jobType"
                  fullWidth
                  defaultValue={formValues.jobType}
                  InputProps={handleInputProps(editEnabled)}
                  onChange={(e) =>
                    handleInputChange(e, formValues, setFormValues)
                  }
                />
              )}
            </TableCell>
          </TableRow>
          {/* Person In Charge */}
          <TableRow>
            <TableCell
              sx={{
                bgcolor: () => "background-primary",
                width: () => "25%",
              }}
            >
              <Typography variant="label2b"> Person in charge </Typography>
            </TableCell>
            <TableCell>
              {!editEnabled ? (
                <Typography variant="body2b">
                  {formValues.personInCharge?.firstName}
                </Typography>
              ) : (
                formValues.personInCharge !== undefined && (
                  <PersonInChargeSelectDropdown
                    personInChargeId={formValues.personInCharge.id}
                    onChange={(e) =>
                      handlePersonInChargeChange(e, formValues, setFormValues)
                    }
                  />
                )
              )}
            </TableCell>
          </TableRow>
          {/* Tags */}
          <TableRow>
            <TableCell
              sx={{
                bgcolor: () => "background-primary",
                width: () => "25%",
              }}
            >
              <Typography variant="label2b"> Tags </Typography>
            </TableCell>
            <TableCell>
              {handleTagChips(editEnabled, formValues, setFormValues)}
            </TableCell>
          </TableRow>
          {/* Remarks */}
          <TableRow>
            <TableCell
              sx={{
                bgcolor: () => "background-primary",
                width: () => "25%",
              }}
            >
              <Typography variant="label2b"> Remarks </Typography>
            </TableCell>
            <TableCell>
              {!editEnabled ? (
                <Typography variant="body2b">{formValues.remarks}</Typography>
              ) : (
                <TextField
                  variant="outlined"
                  size="medium"
                  name="remarks"
                  fullWidth
                  multiline
                  rows={4}
                  defaultValue={formValues.remarks}
                  InputProps={handleInputProps(editEnabled)}
                  onChange={(e) =>
                    handleInputChange(e, formValues, setFormValues)
                  }
                />
              )}
            </TableCell>
          </TableRow>
          {/* Mod  */}
          {!editEnabled && (
            <TableRow>
              <TableCell
                sx={{
                  bgcolor: () => "background-primary",
                  width: () => "25%",
                }}
              >
                <Typography variant="label2b"> Mode of Payment </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2b">
                  {formValues.modeOfPayment}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {editEnabled && (
        <>
          <ModeOfPaymentsRadioGroup
            defaultMOP={formValues.modeOfPayment}
            onChange={(e) => handleMOPChange(e, formValues, setFormValues)}
          />
          <Grid container spacing={1}>
            <Grid item>
              <Button
                onClick={() =>
                  handleSave(
                    true,
                    editEnabled,
                    setEditEnabled,
                    formValues,
                    onJobDetailData
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
                    onJobDetailData
                  )
                }
                variant="outlined"
                color="secondary"
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default JobDetailSection;
