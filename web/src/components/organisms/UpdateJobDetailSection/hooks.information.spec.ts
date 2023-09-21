import { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";
import {
  handleSave,
  handleEdit,
  handleCancel,
  handleTagChips,
  handleMOPChange,
  handleInputProps,
  handleInputChange,
  handlePersonInChargeChange,
} from "./hooks"; // Replace with your actual import path
import { PICDummyValues } from "@/utils/constants/PICDummyValues";
import { FormValues } from "@/utils/constants/FormInitialDummyValues";

describe("Utility Functions", () => {
  const setFormValues = jest.fn();
  const setEditEnabled = jest.fn();
  const setButtonState = jest.fn();
  const setInformationDetails = jest.fn();
  const informationDetails = FormValues.job_information;

  it("should handle person in charge change", () => {
    const e = { target: { value: "1" } } as SelectChangeEvent;
    const expectedUserData = PICDummyValues.find(
      (user) => user.id === Number(e.target.value)
    );

    handlePersonInChargeChange(e, informationDetails, setInformationDetails);

    expect(setInformationDetails).toHaveBeenCalledWith({
      ...informationDetails,
      personInCharge: expectedUserData,
    });
  });

  it("should handle mode of payment change", () => {
    const e = { target: { value: "Credit Card" } } as SelectChangeEvent;

    handleMOPChange(e, informationDetails, setInformationDetails);

    expect(setInformationDetails).toHaveBeenCalledWith({
      ...informationDetails,
      modeOfPayment: e.target.value,
    });
  });

  it("should handle tag chips generation", () => {
    const editEnabled = true;
    const chips = handleTagChips(
      editEnabled,
      informationDetails,
      setInformationDetails
    );

    expect(chips).toHaveLength(informationDetails.tags.length);
  });

  it("should handle input props for read-only mode", () => {
    const inputProps = handleInputProps(false);
    expect(inputProps).toEqual({ readOnly: true });
  });

  it("should handle input props for editable mode", () => {
    const inputProps = handleInputProps(true);
    expect(inputProps).toEqual({ readOnly: false });
  });

  it("should handle edit mode toggling", () => {
    handleEdit(true, setEditEnabled);
    expect(setEditEnabled).toHaveBeenCalledWith(false);

    handleEdit(false, setEditEnabled);
    expect(setEditEnabled).toHaveBeenCalledWith(true);
  });

  it("should handle input change", () => {
    const event = { target: { name: "name", value: "Jane" } } as ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >;

    handleInputChange(event, informationDetails, setInformationDetails);

    expect(setInformationDetails).toHaveBeenCalledWith({
      ...informationDetails,
      [event.target.name]: event.target.value,
    });
  });

  it("should handle save action", () => {
    const editEnabled = true;
    const state = false;

    handleSave(
      state,
      editEnabled,
      setEditEnabled,
      informationDetails,
      FormValues,
      setFormValues,
      setButtonState
    );

    expect(setEditEnabled).toHaveBeenCalledWith(false);
    expect(setFormValues).toHaveBeenCalledWith({
      ...FormValues,
      job_information: informationDetails,
    });
    expect(setButtonState).toHaveBeenCalledWith(state);
  });

  it("should handle cancel action", () => {
    const editEnabled = true;

    handleCancel(
      editEnabled,
      setEditEnabled,
      FormValues,
      setInformationDetails
    );

    expect(setEditEnabled).toHaveBeenCalledWith(false);
    expect(setInformationDetails).toHaveBeenCalledWith(informationDetails);
  });
});
