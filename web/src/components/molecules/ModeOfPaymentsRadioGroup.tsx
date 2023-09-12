import React, { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";

import { ModeOfPaymentEnum } from "../../utils/constants/ModeOfPaymentEnum";
import { JobWithCustomerAndSchedules } from "../../types/JobRegistrationTypes";

const ModeOfPaymentsRadioGroup: FC<{ register: UseFormRegister<JobWithCustomerAndSchedules> }> = ({
    register,
}) => {
    const modeOfPayments = Object.values(ModeOfPaymentEnum);

    const [value, setValue] = React.useState("female");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const getModeOfPaymentLabel = (mode: string): string | undefined => {
        switch (mode) {
            case ModeOfPaymentEnum.CASH:
                return "Cash";
            case ModeOfPaymentEnum.CARD:
                return "Card";
            case ModeOfPaymentEnum.BANK_TRANSFER:
                return "Bank Transfer";
            default:
                break;
        }
    };

    return (
        <FormControl>
            <FormLabel id="mode-of-payment-radio-buttons-group">
                Method of Payment *
            </FormLabel>
            <RadioGroup
                name="mode-of-payment-radio-buttons-group"
                value={value}
                onChange={handleChange}
                row
            >
                {modeOfPayments.map((modeOfPayment: string, index) => (
                    <FormControlLabel
                        {...register("job_information.paymentMethod")}
                        key={index}
                        value={modeOfPayment}
                        label={getModeOfPaymentLabel(modeOfPayment)}
                        control={<Radio />}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default ModeOfPaymentsRadioGroup;
