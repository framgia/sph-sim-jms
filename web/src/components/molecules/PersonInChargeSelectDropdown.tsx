import React, { FC } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { users } from "../organisms/UpdateJobDetailSection/hooks";

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
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.firstName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PersonInChargeSelectDropdown;
