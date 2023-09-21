export const FormValues = {
  customer_registration: {
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    address: "",
  },
  job_information: {
    jobTitle: "",
    jobType: "",
    personInCharge: { id: 1, firstName: "" },
    tags: [""],
    remarks: "",
    modeOfPayment: "",
  },
  work_schedule: [
    {
      startDate: new Date().toString(),
      startTime: new Date().toString(),
      endTime: new Date().toString(),
      endDate: new Date().toString(),
    },
  ],
};
