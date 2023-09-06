import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";

import { ModeOfPaymentEnum } from "../../utils/constants/ModeOfPaymentEnum";

const ModeOfPaymentsRadioGroup = () => {
    const modeOfPayments = Object.values(ModeOfPaymentEnum);

    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
                Method of Payment *
            </FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
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
