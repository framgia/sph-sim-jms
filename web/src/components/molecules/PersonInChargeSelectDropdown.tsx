import React, { FC } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { PICDummyValues } from "@/utils/constants/PICDummyValues";

type Props = {
  personInChargeId?: number;
  onChange?: (e: SelectChangeEvent) => void;
};

const PersonInChargeSelectDropdown: FC<Props> = ({
  personInChargeId,
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="person-in-charge">Person in Charge *</InputLabel>
      <Select
        labelId="person-in-charge"
        id="person-in-charge"
        value={`${personInChargeId}`}
        label="Person in Charge *"
        onChange={onChange}
      >
        {PICDummyValues.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.firstName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PersonInChargeSelectDropdown;
