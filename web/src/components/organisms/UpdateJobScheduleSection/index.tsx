import moment from "moment";
import React, { FC, useEffect, useRef, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { CloseOutlined } from "@mui/icons-material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { useJobDetailContext } from "@/app/job/detail/context";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { handleCancel, handleEdit, handleSave, setValueForm } from "./hooks";

const JobWorkScheduleSection: FC = () => {
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);

  const {
    formValues,
    setFormValues,
    setButtonState,
    scheduleDetails,
    setScheduleDetails,
  } = useJobDetailContext();

  useEffect(() => {
    if (editEnabled && startDateRef.current) {
      startDateRef.current.focus();
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
        Work Schedule
        {!editEnabled && (
          <EditIcon
            fontSize="small"
            style={{ marginLeft: "4px", cursor: "pointer" }}
            onClick={() => handleEdit(editEnabled, setEditEnabled)}
          />
        )}
      </Typography>

      {scheduleDetails.map((scheduleDetail, index) => {
        return (
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Start Date"
                value={moment(scheduleDetail.startDate)}
                readOnly={!editEnabled}
                onChange={(e) =>
                  setValueForm(
                    e,
                    "startDate",
                    scheduleDetails,
                    setScheduleDetails,
                    index
                  )
                }
                inputRef={startDateRef}
              />
              <TimePicker
                label="Start Time"
                value={moment(scheduleDetail.startTime)}
                readOnly={!editEnabled}
                onChange={(e) =>
                  setValueForm(
                    e,
                    "startTime",
                    scheduleDetails,
                    setScheduleDetails,
                    index
                  )
                }
              />
              <DatePicker
                label="End Date"
                value={moment(scheduleDetail.endDate)}
                readOnly={!editEnabled}
                onChange={(e) =>
                  setValueForm(
                    e,
                    "endDate",
                    scheduleDetails,
                    setScheduleDetails,
                    index
                  )
                }
              />
              <TimePicker
                label="End Time"
                value={moment(scheduleDetail.endTime)}
                readOnly={!editEnabled}
                onChange={(e) =>
                  setValueForm(
                    e,
                    "endTime",
                    scheduleDetails,
                    setScheduleDetails,
                    index
                  )
                }
              />

              {editEnabled && (
                <IconButton
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <CloseOutlined fontSize="inherit" />
                </IconButton>
              )}
            </LocalizationProvider>
          </Box>
        );
      })}

      {editEnabled && (
        <>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                onClick={() =>
                  handleSave(
                    true,
                    editEnabled,
                    setEditEnabled,
                    scheduleDetails,
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
                    setScheduleDetails
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

export default JobWorkScheduleSection;
