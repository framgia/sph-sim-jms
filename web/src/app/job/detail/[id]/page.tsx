"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { BreadcrumbsSection } from "@/components/organisms/BreadCrumbsSection";

import { breadCrumbs } from "../hooks";
import { JobDetailContextProvider } from "../context";
import { SubmitButton } from "@/components/organisms/SubmitButton";
import JobDetailSection from "@/components/organisms/UpdateJobDetailSection";
import JobWorkScheduleSection from "@/components/organisms/UpdateJobScheduleSection";
import JobCustomerSection from "../../../../components/organisms/UpdateJobCustomerSection";

export default function Job() {
  return (
    <JobDetailContextProvider>
      <form>
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
          <JobCustomerSection />
          <JobDetailSection />
          <JobWorkScheduleSection />

          <SubmitButton />
        </Box>
      </form>
    </JobDetailContextProvider>
  );
}
