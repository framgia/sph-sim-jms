import { FormValues } from "@/utils/constants/FormInitialDummyValues";
import {
  CustomerFormType,
  FormValuesType,
  InformationFormType,
  ScheduleFormType,
} from "@/utils/interfaces";
import React, { useState, ReactNode, createContext, useContext } from "react";

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
  const { customer_registration, job_information, work_schedule } = FormValues;

  const [customerDetails, setCustomerDetails] = useState<CustomerFormType>(
    customer_registration
  );
  const [informationDetails, setInformationDetails] =
    useState<InformationFormType>(job_information);
  const [scheduleDetails, setScheduleDetails] =
    useState<ScheduleFormType[]>(work_schedule);
  const [buttonState, setButtonState] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValuesType>(FormValues);

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
