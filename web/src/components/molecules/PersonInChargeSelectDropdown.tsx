import React, { FC, useEffect } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import axios_instance from "../../utils/axiosInstance";
import { UseFormRegister } from "react-hook-form";

import { JobWithCustomerAndSchedules } from "../../types/JobRegistrationTypes";

const PersonInChargeSelectDropdown: FC<{ register: UseFormRegister<JobWithCustomerAndSchedules> }> = ({
    register,
}) => {
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        axios_instance
            .get("/user")
            .then((res) => {
                const users = res.data;
                setUsers(users);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const [personInCharge, setPersonInCharge] = React.useState<string>("");

    const handlePersonInChargeChange = (e: SelectChangeEvent) => {
        const newPersonInCharge = e.target.value;
        setPersonInCharge(newPersonInCharge);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="person-in-charge">Person in Charge *</InputLabel>
            <Select
                {...register("job_information.userId")}
                labelId="person-in-charge"
                id="person-in-charge"
                value={personInCharge}
                label="Person in Charge *"
                onChange={handlePersonInChargeChange}
                MenuProps={{
                    sx: {
                        height: "320px",
                    },
                }}
            >
                {users.map((user: { id: number, firstName: string }) => (
                    <MenuItem key={user.id} value={user.id}>
                        {user.firstName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default PersonInChargeSelectDropdown;
