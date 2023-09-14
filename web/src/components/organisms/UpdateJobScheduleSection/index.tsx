import { Moment } from "moment";
import React, { FC, useEffect, useRef, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { CloseOutlined } from "@mui/icons-material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  handleEdit,
  handleSave,
  updateEndDate,
  updateEndTime,
  updateStartDate,
  updateStartTime,
} from "./hooks";
import moment from "moment";
import { ScheduleFormType } from "@/utils/interfaces";
import { initialValues } from "@/utils/constants/JobScheduleDummyValues";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";

type Props = {
  onWorkScheduleData: (data: ScheduleFormType) => void;
};

const JobWorkScheduleSection: FC<Props> = ({ onWorkScheduleData }) => {
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<ScheduleFormType>(initialValues);

  const [startDate, setStartDate] = React.useState<Moment | null>(
    moment(formValues.startDate)
  );
  const [startTime, setStartTime] = React.useState<Moment | null>(
    moment(formValues.startTime)
  );
  const [endDate, setEndDate] = React.useState<Moment | null>(
    moment(formValues.endDate)
  );
  const [endTime, setEndTime] = React.useState<Moment | null>(
    moment(formValues.endTime)
  );

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

      <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="Start Date"
            value={startDate}
            readOnly={!editEnabled}
            onChange={(e) =>
              updateStartDate(e, setStartDate, formValues, setFormValues)
            }
            inputRef={startDateRef}
          />
          <TimePicker
            label="Start Time"
            value={startTime}
            readOnly={!editEnabled}
            onChange={(e) =>
              updateStartTime(e, setStartTime, formValues, setFormValues)
            }
          />
          <DatePicker
            label="End Date"
            value={endDate}
            readOnly={!editEnabled}
            onChange={(e) =>
              updateEndDate(e, setEndDate, formValues, setFormValues)
            }
          />
          <TimePicker
            label="End Time"
            value={endTime}
            readOnly={!editEnabled}
            onChange={(e) =>
              updateEndTime(e, setEndTime, formValues, setFormValues)
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

      {editEnabled && (
        <>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                onClick={() =>
                  handleSave(
                    true,
                    editEnabled,
                    formValues,
                    setEditEnabled,
                    onWorkScheduleData
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
                    formValues,
                    setEditEnabled,
                    onWorkScheduleData
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
