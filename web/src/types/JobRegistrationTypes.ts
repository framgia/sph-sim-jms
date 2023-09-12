import { z } from 'zod';

const CustomerRegistrationSchema = z.object({
    firstName: z.string().min(3, {message: "Must be atleast 3 characters"}),
    lastName: z.string().min(3, {message: "Must be atleast 3 characters"}),
    email: z.string().email({ message: "Invalid email"}),
    contact: z.string().min(3, {message: "Must be atleast 3 characters"}),
    address: z.string().min(3, {message: "Must be atleast 3 characters"}),
});

const JobInformationSchema = z.object({
    title: z.string().min(3, {message: "Must be atleast 3 characters"}),
    type: z.string().min(3, {message: "Must be atleast 3 characters"}),
    userId: z.number(),
    tags: z.array(z.enum(["TAG_A", "TAG_B", "TAG_C"])),
    remarks: z.string().optional(),
    paymentMethod: z.enum(["CASH", "CARD", "BANK_TRANSFER"])
});

const WorkScheduleSchema = z.object({
    startDate: z.any(),
    startTime: z.any(),
    endDate: z.any(),
    endTime: z.any(),
});

export const JobWithCustomerAndSchedulesSchema = z.object({
    customer_registration: CustomerRegistrationSchema,
    job_information: JobInformationSchema,
    work_schedules: z.array(WorkScheduleSchema),
});

export type CustomerRegistration = z.infer<typeof CustomerRegistrationSchema>;
export type JobInformation = z.infer<typeof JobInformationSchema>;
export type WorkSchedule = z.infer<typeof WorkScheduleSchema>;
export type JobWithCustomerAndSchedules = z.infer<typeof JobWithCustomerAndSchedulesSchema>;
