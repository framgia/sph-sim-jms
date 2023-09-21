import { FormValuesType, InformationFormType } from "@/utils/interfaces";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { PICDummyValues } from "@/utils/constants/PICDummyValues";
import { Chip, SelectChangeEvent, Typography } from "@mui/material";

export const users = PICDummyValues;

export const handlePersonInChargeChange = (
  e: SelectChangeEvent,
  formValues: InformationFormType,
  setFormValues: (JobInformationDummy: InformationFormType) => void
) => {
  const { value } = e.target;
  const userData = users.find((user) => user.id === Number(value));

  if (userData !== undefined) {
    setFormValues({
      ...formValues,
      ["personInCharge"]: userData,
    });
  }
};

export const handleMOPChange = (
  e: SelectChangeEvent,
  formValues: InformationFormType,
  setFormValues: (JobInformationDummy: InformationFormType) => void
) => {
  const { value } = e.target;
  setFormValues({
    ...formValues,
    ["modeOfPayment"]: value,
  });
};

export const handleTagChips = (
  editEnabled: boolean,
  formValues: InformationFormType,
  setFormValues: (JobInformationDummy: InformationFormType) => void
): JSX.Element[] => {
  const { tags } = formValues;
  const handleDelete = (
    index: number,
    tagArray: string[],
    setFormValues: (JobInformationDummy: InformationFormType) => void
  ) => {
    const updatedItems = [...tagArray];
    updatedItems.splice(index, 1);
    return setFormValues({
      ...formValues,
      ["tags"]: updatedItems,
    });
  };

  return tags.map((item, index) => {
    return (
      <Chip
        key={index}
        sx={{ marginRight: "4px" }}
        label={<Typography variant="body2b">{item}</Typography>}
        onDelete={
          editEnabled
            ? () => handleDelete(index, tags, setFormValues)
            : undefined
        }
      />
    );
  });
};

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
  informationDetails: InformationFormType,
  setInformationDetails: (JobInformationDummy: InformationFormType) => void
): void => {
  const { name, value } = event.target;
  setInformationDetails({
    ...informationDetails,
    [name]: value,
  });
};

export const handleSave = (
  state: boolean,
  editEnabled: boolean,
  setEditEnabled: Dispatch<SetStateAction<boolean>>,
  informationDetails: InformationFormType,
  formValues: FormValuesType,
  setFormValues: (newFormValue: FormValuesType) => void,
  setButtonState: (newButtonState: boolean) => void
) => {
  setButtonState(state);
  setEditEnabled(!editEnabled);
  setFormValues({
    ...formValues,
    ["job_information"]: informationDetails,
  });
};

export const handleCancel = (
  editEnabled: boolean,
  setEditEnabled: Dispatch<SetStateAction<boolean>>,
  formValues: FormValuesType,
  setInformationDetails: (newFormValue: InformationFormType) => void
) => {
  setEditEnabled(!editEnabled);
  setInformationDetails(formValues.job_information);
};
