import { ChangeEvent } from "react";
import { FormValues } from "@/utils/constants/FormInitialDummyValues";
import {
  handleSave,
  handleEdit,
  handleCancel,
  handleInputProps,
  handleInputChange,
} from "./hooks";

describe("Utility Functions", () => {
  const formValues = FormValues;
  const setFormValues = jest.fn();
  const setButtonState = jest.fn();
  const setEditEnabled = jest.fn();
  const setCustomerDetails = jest.fn();
  const customerDetails = FormValues.customer_registration;

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
    handleEdit(false, setEditEnabled);

    expect(setEditEnabled).toHaveBeenCalledWith(false);
    expect(setEditEnabled).toHaveBeenCalledWith(true);
  });

  it("should handle input change", () => {
    const event = { target: { name: "name", value: "Jane" } } as ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >;

    handleInputChange(event, customerDetails, setCustomerDetails);

    expect(setCustomerDetails).toHaveBeenCalledWith({
      ...customerDetails,
      name: "Jane",
    });
  });

  it("should handle save action", () => {
    const editEnabled = true;
    const state = false;

    handleSave(
      state,
      editEnabled,
      setEditEnabled,
      customerDetails,
      formValues,
      setFormValues,
      setButtonState
    );

    expect(setEditEnabled).toHaveBeenCalledWith(false);
    expect(setFormValues).toHaveBeenCalledWith({
      ...formValues,
      customer_registration: customerDetails,
    });
    expect(setButtonState).toHaveBeenCalledWith(state);
  });

  it("should handle cancel action", () => {
    const editEnabled = true;

    handleCancel(editEnabled, setEditEnabled, formValues, setCustomerDetails);

    expect(setEditEnabled).toHaveBeenCalledWith(false);
    expect(setCustomerDetails).toHaveBeenCalledWith(
      formValues.customer_registration
    );
  });
});
