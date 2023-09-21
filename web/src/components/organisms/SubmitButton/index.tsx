import { FC } from "react";
import { handleSubmit } from "./hooks";
import { Box, Button } from "@mui/material";
import { useJobDetailContext } from "@/app/job/detail/context";

export const SubmitButton: FC = () => {
  const { formValues, buttonState, setButtonState } = useJobDetailContext();

  return (
    <Box>
      <Button
        size="large"
        color="primary"
        variant="contained"
        onClick={() => handleSubmit(formValues, buttonState, setButtonState)}
        disabled={!buttonState}
      >
        Submit
      </Button>
    </Box>
  );
};
