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

import ModeOfPaymentsRadioGroup from "../../molecules/ModeOfPaymentsRadioGroup";
import PersonInChargeSelectDropdown from "../../molecules/PersonInChargeSelectDropdown";
import {
  handleEdit,
  handleTagChips,
  handleMOPChange,
  handleInputProps,
  handleInputChange,
  handlePersonInChargeChange,
  handleSave,
  handleCancel,
} from "./hooks";
import { useJobDetailContext } from "@/app/job/detail/context";

const JobDetailSection: FC = () => {
  const jobTitle = useRef<HTMLInputElement | null>(null);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const {
    informationDetails,
    setInformationDetails,
    formValues,
    setFormValues,
    setButtonState,
  } = useJobDetailContext();

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
                <Typography variant="body2b">
                  {informationDetails.jobTitle}
                </Typography>
              ) : (
                <TextField
                  variant="outlined"
                  size="medium"
                  name="jobTitle"
                  fullWidth
                  defaultValue={informationDetails.jobTitle}
                  InputProps={handleInputProps(editEnabled)}
                  inputRef={jobTitle}
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      informationDetails,
                      setInformationDetails
                    )
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
                <Typography variant="body2b">
                  {informationDetails.jobType}
                </Typography>
              ) : (
                <TextField
                  variant="outlined"
                  size="medium"
                  name="jobType"
                  fullWidth
                  defaultValue={informationDetails.jobType}
                  InputProps={handleInputProps(editEnabled)}
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      informationDetails,
                      setInformationDetails
                    )
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
                  {informationDetails.personInCharge?.firstName}
                </Typography>
              ) : (
                informationDetails.personInCharge !== undefined && (
                  <PersonInChargeSelectDropdown
                    personInChargeId={informationDetails.personInCharge.id}
                    onChange={(e) =>
                      handlePersonInChargeChange(
                        e,
                        informationDetails,
                        setInformationDetails
                      )
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
              {handleTagChips(
                editEnabled,
                informationDetails,
                setInformationDetails
              )}
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
                <Typography variant="body2b">
                  {informationDetails.remarks}
                </Typography>
              ) : (
                <TextField
                  variant="outlined"
                  size="medium"
                  name="remarks"
                  fullWidth
                  multiline
                  rows={4}
                  defaultValue={informationDetails.remarks}
                  InputProps={handleInputProps(editEnabled)}
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      informationDetails,
                      setInformationDetails
                    )
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
                  {informationDetails.modeOfPayment}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {editEnabled && (
        <>
          <ModeOfPaymentsRadioGroup
            defaultMOP={informationDetails.modeOfPayment}
            onChange={(e) =>
              handleMOPChange(e, informationDetails, setInformationDetails)
            }
          />
          <Grid container spacing={1}>
            <Grid item>
              <Button
                onClick={() =>
                  handleSave(
                    true,
                    editEnabled,
                    setEditEnabled,
                    informationDetails,
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
                    setInformationDetails
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
