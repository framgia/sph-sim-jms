import { Moment } from "moment";
import { Dispatch, SetStateAction } from "react";
import { FormValuesType, ScheduleFormType } from "@/utils/interfaces";

export const setValueForm = (
  e: Moment | null,
  name: string,
  scheduleDetail: ScheduleFormType[],
  setScheduleDetails: (newFormValue: ScheduleFormType[]) => void,
  index: number
) => {
  const data = e?.format("YYYY-MM-DDTHH:mm:ss[Z]");
  if (data !== undefined) {
    const updatedScheduleDetails = [...scheduleDetail];
    updatedScheduleDetails[index] = {
      ...updatedScheduleDetails[index],
      [name]: data,
    };
    setScheduleDetails(updatedScheduleDetails);
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
  setEditEnabled: Dispatch<SetStateAction<boolean>>,
  scheduleDetails: ScheduleFormType[],
  formValues: FormValuesType,
  setFormValues: (newFormValue: FormValuesType) => void,
  setButtonState: (newButtonState: boolean) => void
) => {
  setButtonState(state);
  setEditEnabled(!editEnabled);
  setFormValues({
    ...formValues,
    ["work_schedule"]: scheduleDetails,
  });
};

export const handleCancel = (
  editEnabled: boolean,
  setEditEnabled: Dispatch<SetStateAction<boolean>>,
  formValues: FormValuesType,
  setScheduleDetails: (newFormValue: ScheduleFormType[]) => void
) => {
  setEditEnabled(!editEnabled);
  setScheduleDetails(formValues.work_schedule);
};
