import { $Enums } from "@prisma/client";

export type ReturnJobType = {
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
    tags: $Enums.Tag[] | ""[];
    remarks: string;
    modeOfPayment: string;
  };
  work_schedule: {
    startDate: string | Date;
    startTime: string | Date;
    endDate: string | Date;
    endTime: string | Date;
  }[];
};

export type JobTypes = {
  id: number;
  title: string;
  type: string;
  tags: $Enums.Tag[];
  remarks: string;
  customerId: number;
  paymentMethod: $Enums.PaymentMethod;
  userId: number;
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    address: string;
  };
  personInCharge: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: $Enums.Role;
  };
  schedules: {
    id: number;
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
    jobId: number;
  }[];
};
