import { CustomerFormType } from "@/utils/interfaces";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleInputProps = (editEnabled?: boolean) => {
  return !editEnabled ? { readOnly: true } : { readOnly: false };
};

export const handleEdit = (
  editEnabled: boolean,
  setEditEnabled: Dispatch<SetStateAction<boolean>>
) => {
  return setEditEnabled(!editEnabled);
};

export const handleInputChange = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  formValues: CustomerFormType,
  setFormValues: Dispatch<SetStateAction<CustomerFormType>>
): void => {
  const { name, value } = event.target;
  setFormValues({
    ...formValues,
    [name]: value,
  });
};

export const handleSave = (
  state: boolean,
  editEnabled: boolean,
  setEditEnabled: Dispatch<SetStateAction<boolean>>,
  formValues: CustomerFormType,
  onCustomerData: (data: CustomerFormType) => void
) => {
  setEditEnabled(!editEnabled);
  if (state) {
    onCustomerData(formValues);
  } else {
    setEditEnabled(false);
  }
};
