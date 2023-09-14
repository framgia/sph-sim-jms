import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  SelectChangeEvent,
} from "@mui/material";

import { ModeOfPaymentEnum } from "../../utils/constants/ModeOfPaymentEnum";
import { FC } from "react";

type Props = {
  defaultMOP?: string;
  onChange?: (e: SelectChangeEvent) => void;
};

const ModeOfPaymentsRadioGroup: FC<Props> = ({ defaultMOP, onChange }) => {
  const modeOfPayments = Object.values(ModeOfPaymentEnum);

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Method of Payment *
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="row-radio-buttons-group"
        value={defaultMOP}
        onChange={onChange}
      >
        {modeOfPayments.map((mop: string, index) => (
          <FormControlLabel
            key={index}
            value={mop}
            label={mop}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ModeOfPaymentsRadioGroup;
