import { Moment } from "moment";
import { Dispatch, SetStateAction } from "react";
import { ScheduleFormType } from "@/utils/interfaces";

export const updateStartDate = (
  newStartDate: Moment | null,
  setStartDate: Dispatch<SetStateAction<Moment | null>>,
  formValues: ScheduleFormType,
  setFormValues: Dispatch<SetStateAction<ScheduleFormType>>
) => {
  setStartDate(newStartDate);
  setValueForm(newStartDate, "startDate", formValues, setFormValues);
};

export const updateStartTime = (
  newStartTime: Moment | null,
  setStartTime: Dispatch<SetStateAction<Moment | null>>,
  formValues: ScheduleFormType,
  setFormValues: Dispatch<SetStateAction<ScheduleFormType>>
): void => {
  setStartTime(newStartTime);
  setValueForm(newStartTime, "startTime", formValues, setFormValues);
};

export const updateEndDate = (
  newEndDate: Moment | null,
  setEndDate: Dispatch<SetStateAction<Moment | null>>,
  formValues: ScheduleFormType,
  setFormValues: Dispatch<SetStateAction<ScheduleFormType>>
) => {
  setEndDate(newEndDate);
  setValueForm(newEndDate, "endDate", formValues, setFormValues);
};

export const updateEndTime = (
  newEndTime: Moment | null,
  setEndTime: Dispatch<SetStateAction<Moment | null>>,
  formValues: ScheduleFormType,
  setFormValues: Dispatch<SetStateAction<ScheduleFormType>>
): void => {
  setEndTime(newEndTime);
  setValueForm(newEndTime, "endTime", formValues, setFormValues);
};

export const setValueForm = (
  e: Moment | null,
  name: string,
  formValues: ScheduleFormType,
  setFormValues: Dispatch<SetStateAction<ScheduleFormType>>
) => {
  const data = e?.format("YYYY-MM-DDTHH:mm:ss[Z]");
  if (data !== undefined) {
    setFormValues({
      ...formValues,
      [name]: data,
    });
  }
};

export const handleEdit = (
  editEnabled: boolean,
  setEditEnabled: Dispatch<SetStateAction<boolean>>
) => {
  setEditEnabled(!editEnabled);
};

export const handleSave = (
  state: boolean,
  editEnabled: boolean,
  formValues: ScheduleFormType,
  setEditEnabled: Dispatch<SetStateAction<boolean>>,
  onWorkScheduleData: (data: ScheduleFormType) => void
) => {
  setEditEnabled(!editEnabled);
  if (state) {
    onWorkScheduleData(formValues);
  } else {
    setEditEnabled(false);
  }
};
