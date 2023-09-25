export const CustomerInfoDetails = {
  firstName: "John",
  lastName: "Cena",
  contact: "1234567890",
  email: "youcantseeme@example.com",
  address: "123 Main St",
} as const;

export const JobInfoDetails = {
  title: "Fix Plumbing",
  type: "Plumbing",
  tags: ["TAG_A", "TAG_B", "TAG_C"],
  remarks: "Fix leaky faucet",
  customerId: 19,
  paymentMethod: "BANK_TRANSFER",
  userId: 5,
} as const;

export const WorkscheduleInfoDetails = [
  {
    id: 1,
    startDate: "2024-10-01T00:00:00Z",
    startTime: "2023-09-01T08:32:22.345Z",
    endDate: "2024-09-01T00:00:00Z",
    endTime: "2023-09-01T08:32:22.345Z",
  },
] as const;
