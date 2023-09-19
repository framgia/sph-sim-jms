import { Tag } from "../enums/TagsEnum";
import { PipelinePhase } from "../enums/pipeLinePhase";
import { PaymentMethod } from "../enums/PaymentMethodEnum";

export type JobTesting = {
  id: number;
  title: string;
  type: string;
  tags: Tag[];
  remarks: string;
  customerId: number;
  paymentMethod: PaymentMethod;
  userId: number;
  pipelinePhase: PipelinePhase;
  createdAt: Date;
  updatedAt: Date;
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  };
  personInCharge: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: "USER";
    createdAt: Date;
    updatedAt: Date;
  };
  schedules: {
    id: number;
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
    jobId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
