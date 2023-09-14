import { InformationFormType } from "@/utils/interfaces";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { PICDummyValues } from "@/utils/constants/PICDummyValues";
import { Chip, SelectChangeEvent, Typography } from "@mui/material";

export const users = PICDummyValues;

export const handlePersonInChargeChange = (
  e: SelectChangeEvent,
  formValues: InformationFormType,
  setFormValues: Dispatch<SetStateAction<InformationFormType>>
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
  setFormValues: Dispatch<SetStateAction<InformationFormType>>
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
  setFormValues: Dispatch<SetStateAction<InformationFormType>>
): JSX.Element[] => {
  const { tags } = formValues;
  const handleDelete = (
    index: number,
    tagArray: string[],
    setFormValues: Dispatch<SetStateAction<InformationFormType>>
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
  formValues: InformationFormType,
  setFormValues: Dispatch<SetStateAction<InformationFormType>>
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
  formValues: InformationFormType,
  onJobDetailData: (data: InformationFormType) => void
) => {
  setEditEnabled(!editEnabled);
  if (state) {
    onJobDetailData(formValues);
  } else {
    setEditEnabled(false);
  }
};
