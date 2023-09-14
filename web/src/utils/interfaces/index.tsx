export interface InformationFormType {
  jobTitle: string;
  jobType: string;
  personInCharge: { id: number; firstName: string };
  tags: string[];
  remarks: string;
  modeOfPayment: string;
}

export interface CustomerFormType {
  firstName: string;
  lastName: string;
  contact: string;
  email: string;
  address: string;
}

export interface ScheduleFormType {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export interface FormValuesType {
  customer_registration: {
    firstName: string;
    lastName: string;
    contact: string;
    email: string;
    address: string;
  };
  job_information: {
    jobTitle: string;
    jobType: string;
    personInCharge: { id: number; firstName: string };
    tags: string[];
    remarks: string;
    modeOfPayment: string;
  };
  work_schedule: {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
  }[];
}
