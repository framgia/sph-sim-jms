import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { PICDummyValues } from "@/utils/constants/PICDummyValues";
import { Chip, SelectChangeEvent, Typography } from "@mui/material";
import { FormValuesType, InformationFormType } from "@/utils/interfaces";

export const handlePersonInChargeChange = (
  e: SelectChangeEvent,
  informationDetails: InformationFormType,
  setInformationDetails: (newJobInformationDummy: InformationFormType) => void
) => {
  const { value } = e.target;
  const userData = PICDummyValues.find((user) => user.id === Number(value));

  if (userData !== undefined) {
    setInformationDetails({
      ...informationDetails,
      ["personInCharge"]: userData,
    });
  }
};

export const handleMOPChange = (
  e: SelectChangeEvent,
  formValues: InformationFormType,
  setInformationDetails: (newJobInformationDummy: InformationFormType) => void
) => {
  const { value } = e.target;
  setInformationDetails({
    ...formValues,
    ["modeOfPayment"]: value,
  });
};

export const handleTagChips = (
  editEnabled: boolean,
  formValues: InformationFormType,
  setInformationDetails: (newJobInformationDummy: InformationFormType) => void
): JSX.Element[] => {
  const { tags } = formValues;
  const handleDelete = (
    index: number,
    tagArray: string[],
    setInformationDetails: (newJobInformationDummy: InformationFormType) => void
  ) => {
    const updatedItems = [...tagArray];
    updatedItems.splice(index, 1);
    return setInformationDetails({
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
            ? () => handleDelete(index, tags, setInformationDetails)
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
  setInformationDetails: (newJobInformationDummy: InformationFormType) => void
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
