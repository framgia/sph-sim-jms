"use client";

import { useGetJob } from "@/hooks/useJob";
import { FormValues } from "@/utils/constants/FormInitialDummyValues";
import {
  FormValuesType,
  ScheduleFormType,
  CustomerFormType,
  InformationFormType,
} from "@/utils/interfaces";
import React, {
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from "react";
import { useParams } from "next/navigation";

// Create the context
const JobDetailContext = createContext({
  // For Job Customer Section
  customerDetails: FormValues.customer_registration,
  setCustomerDetails: (newButtonState: CustomerFormType) => {
    useState<CustomerFormType>(newButtonState);
  },

  // For Job Information Section
  informationDetails: FormValues.job_information,
  setInformationDetails: (newJobInformation: InformationFormType) => {
    useState<InformationFormType>(newJobInformation);
  },

  // For Job Schedule
  scheduleDetails: FormValues.work_schedule,
  setScheduleDetails: (newSchedule: ScheduleFormType[]) => {
    useState<ScheduleFormType[]>(newSchedule);
  },

  // For Final object
  formValues: FormValues,
  setFormValues: (newFormValue: FormValuesType) => {
    useState<FormValuesType>(newFormValue);
  },

  // For Update button state
  buttonState: false,
  setButtonState: (newButtonState: boolean) => {
    useState<boolean>(newButtonState);
  },
});

// Create a provider component
const JobDetailContextProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams();
  const [customerDetails, setCustomerDetails] = useState<CustomerFormType>(
    FormValues.customer_registration
  );
  const [informationDetails, setInformationDetails] =
    useState<InformationFormType>(FormValues.job_information);
  const [scheduleDetails, setScheduleDetails] = useState<ScheduleFormType[]>(
    FormValues.work_schedule
  );
  const [buttonState, setButtonState] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValuesType>(FormValues);

  // For initial values
  useEffect(() => {
    const fetchJobData = async (id: number) => {
      try {
        const jobData = await useGetJob(id);
        const { customer_registration, job_information, work_schedule } =
          jobData;

        setFormValues(jobData);
        setScheduleDetails(work_schedule);
        setInformationDetails(job_information);
        setCustomerDetails(customer_registration);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchJobData(Number(id));
  }, [id]);

  return (
    <JobDetailContext.Provider
      value={{
        formValues,
        buttonState,
        setFormValues,
        setButtonState,
        scheduleDetails,
        customerDetails,
        informationDetails,
        setScheduleDetails,
        setCustomerDetails,
        setInformationDetails,
      }}
    >
      {children}
    </JobDetailContext.Provider>
  );
};

export { JobDetailContext, JobDetailContextProvider };

export function useJobDetailContext() {
  const context = useContext(JobDetailContext);
  if (!context) {
    throw new Error("Custom hook in JobDetailContextProvider");
  }

  return context;
}
