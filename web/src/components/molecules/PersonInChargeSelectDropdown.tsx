import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";

const PersonInChargeSelectDropdown = () => {
    const users = [
        { id: 1, firstName: "John" },
        { id: 2, firstName: "Jane" },
        { id: 3, firstName: "Jack" },
    ]; // TODO: fetch users from server

    const [personInCharge, setPersonInCharge] = React.useState("John");

    const handlePersonInChargeChange = (e: SelectChangeEvent) => {
        const newPersonInCharge = e.target.value;
        setPersonInCharge(newPersonInCharge as string);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="person-in-charge">Person in Charge *</InputLabel>
            <Select
                labelId="person-in-charge"
                id="person-in-charge"
                value={personInCharge}
                label="Person in Charge *"
                onChange={handlePersonInChargeChange}
            >
                {users.map((user) => (
                    <MenuItem key={user.id} value={user.firstName}>
                        {user.firstName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default PersonInChargeSelectDropdown;
