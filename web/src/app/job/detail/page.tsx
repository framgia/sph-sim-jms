"use client";

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FormValues } from "@/utils/constants/FormInitialDummyValues";
import JobDetailSection from "@/components/organisms/UpdateJobDetailSection";
import { BreadcrumbsSection } from "@/components/organisms/BreadCrumbsSection";
import {
  ScheduleFormType,
  CustomerFormType,
  InformationFormType,
} from "@/utils/interfaces";

import {
  handleSubmit,
  handleCustomerData,
  handleJobDetailData,
  handleWorkScheduleData,
  breadCrumbs,
} from "./hooks";
import JobCustomerSection from "../../../components/organisms/UpdateJobCustomerSection";
import JobWorkScheduleSection from "../../../components/organisms/UpdateJobScheduleSection";

export default function Job() {
  const [buttonState, setButtonState] = useState<boolean>(false);
  const [formValues, setFormValues] = useState(FormValues);

  return (
    <form onSubmit={() => handleSubmit(formValues)}>
      <Box
        sx={{
          gap: "24px",
          width: "960px",
          display: "flex",
          paddingX: "24px",
          paddingY: "16px",
          flexDirection: "column",
        }}
      >
        <BreadcrumbsSection crumbs={breadCrumbs()} />

        <Typography variant="h1">Job Detail</Typography>

        <JobCustomerSection
          onCustomerData={(data: CustomerFormType) =>
            handleCustomerData(data, setButtonState, formValues, setFormValues)
          }
        />
        <JobDetailSection
          onJobDetailData={(data: InformationFormType) =>
            handleJobDetailData(data, setButtonState, formValues, setFormValues)
          }
        />
        <JobWorkScheduleSection
          onWorkScheduleData={(data: ScheduleFormType) =>
            handleWorkScheduleData(
              data,
              setButtonState,
              formValues,
              setFormValues
            )
          }
        />

        <Box>
          <Button
            size="large"
            color="primary"
            variant="contained"
            disabled={!buttonState}
            onClick={() => handleSubmit(formValues)}
          >
            SUBMIT
          </Button>
        </Box>
      </Box>
    </form>
  );
}
