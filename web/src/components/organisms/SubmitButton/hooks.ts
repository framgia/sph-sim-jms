import { FormValuesType } from "@/utils/interfaces";

export const handleSubmit = (
  formValues: FormValuesType,
  buttonState: boolean,
  setButtonState: (newButtonState: boolean) => void
) => {
  setButtonState(!buttonState);
  alert(JSON.stringify(formValues, null, 2));
};
