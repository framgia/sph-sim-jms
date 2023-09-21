import moment from "moment";
import { Moment } from "moment";
import { ScheduleFormType } from "@/utils/interfaces";
import { FormValues } from "@/utils/constants/FormInitialDummyValues";
import { setValueForm, handleEdit, handleSave, handleCancel } from "./hooks"; // Replace with your actual import path

describe("Utility Functions", () => {
  const setFormValues = jest.fn();
  const setEditEnabled = jest.fn();
  const setButtonState = jest.fn();
  const setScheduleDetails = jest.fn();

  it("should set value in schedule form", () => {
    const e: Moment | null = moment("2023-09-21T15:31:41.170Z");
    const name = "startTime";
    const scheduleDetail: ScheduleFormType[] = [
      { startTime: "", endTime: "" },
    ] as ScheduleFormType[];
    const index = 0;

    setValueForm(e, name, scheduleDetail, setScheduleDetails, index);

    expect(setScheduleDetails).toHaveBeenCalledWith([
      { startTime: "2023-09-21T15:31:41Z", endTime: "" },
    ]);
  });

  it("should handle edit mode toggling", () => {
    const editEnabled = true;

    handleEdit(editEnabled, setEditEnabled);

    expect(setEditEnabled).toHaveBeenCalledWith(false);
  });

  it("should handle save action", () => {
    const state = false;
    const editEnabled = true;
    const scheduleDetails: ScheduleFormType[] = [
      { startDate: "", endDate: "", startTime: "", endTime: "" },
    ];

    handleSave(
      state,
      editEnabled,
      setEditEnabled,
      scheduleDetails,
      FormValues,
      setFormValues,
      setButtonState
    );

    expect(setButtonState).toHaveBeenCalledWith(state);
    expect(setEditEnabled).toHaveBeenCalledWith(false);
    expect(setFormValues).toHaveBeenCalledWith({
      ...FormValues,
      ["work_schedule"]: scheduleDetails,
    });
  });

  it("should handle cancel action", () => {
    const editEnabled = true;

    handleCancel(editEnabled, setEditEnabled, FormValues, setScheduleDetails);

    expect(setEditEnabled).toHaveBeenCalledWith(false);
    expect(setScheduleDetails).toHaveBeenCalledWith(FormValues.work_schedule);
  });
});
