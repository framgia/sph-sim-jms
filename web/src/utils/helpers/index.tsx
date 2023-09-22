import { JobSchema, JobTableRow } from '../types/job';
import { ScheduleSchema } from '../types/schedule';

export const formatEnum = (value: string): string => {
  let words = value.split('_');
  words = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return words.join(' ');
};

export const convertEnumToOptions = (
  enumObj: Record<string, string>
): Array<{ value: string; name: string }> => {
  const options = Object.keys(enumObj).map((key) => ({
    value: enumObj[key],
    name: formatEnum(key)
  }));

  return options;
};

export const convertTableData = (data: JobSchema[]): JobTableRow[] => {
  const tableData = data.map((job: JobSchema) => ({
    id: job.id,
    title: job.title,
    customer: `${job.customer.firstName} ${job.customer.lastName}`,
    tags: job.tags.map((tag) => formatEnum(tag)).sort(),
    schedules: formatSchedules(job.schedules).sort(),
    estimation: {
      status: job.estimation?.status
        ? formatEnum(job.estimation?.status)
        : 'Not Yet Created',
      cost: job.estimation?.totalCost ? `₱ ${job.estimation?.totalCost}` : '-'
    },
    personInCharge: `${job.personInCharge.firstName} ${job.personInCharge.lastName}`,
    pipelinePhase: formatEnum(job.pipelinePhase),
    createdAt: formatDate(job.createdAt)
  }));

  return tableData;
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

const formatTime = (date: string): string => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

const formatSchedules = (schedules: ScheduleSchema[]): string[] => {
  const scheduleData = schedules.map((schedule: ScheduleSchema) => {
    const startDateTime = `${formatDate(schedule.startDate)} ${formatTime(
      schedule.startTime
    )}`;
    const endDateTime = `${formatTime(schedule.endTime)}`;
    return `${startDateTime} - ${endDateTime}`;
  });

  return scheduleData;
};
