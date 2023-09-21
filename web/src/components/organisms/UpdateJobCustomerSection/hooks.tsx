import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { CustomerFormType, FormValuesType } from "@/utils/interfaces";

export const handleInputProps = (editEnabled?: boolean) => {
  return !editEnabled ? { readOnly: true } : { readOnly: false };
};

export const handleEdit = (
  editEnabled: boolean,
  setEditEnabled: Dispatch<SetStateAction<boolean>>
) => {
  setEditEnabled(!editEnabled);
};

export const handleInputChange = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  customerDetails: CustomerFormType,
  setCustomerDetails: (initialFormValues: CustomerFormType) => void
) => {
  const { name, value } = event.target;
  setCustomerDetails({
    ...customerDetails,
    [name]: value,
  });
};

export const handleSave = (
  state: boolean,
  editEnabled: boolean,
  setEditEnabled: Dispatch<SetStateAction<boolean>>,
  customerDetails: CustomerFormType,
  formValues: FormValuesType,
  setFormValues: (newFormValue: FormValuesType) => void,
  setButtonState: (newButtonState: boolean) => void
) => {
  setButtonState(state);
  setEditEnabled(!editEnabled);
  setFormValues({
    ...formValues,
    ["customer_registration"]: customerDetails,
  });
};

export const handleCancel = (
  editEnabled: boolean,
  setEditEnabled: Dispatch<SetStateAction<boolean>>,
  formValues: FormValuesType,
  setCustomerDetails: (newFormValue: CustomerFormType) => void
) => {
  setEditEnabled(!editEnabled);
  setCustomerDetails(formValues.customer_registration);
};
