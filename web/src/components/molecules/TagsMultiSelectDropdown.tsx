import React from "react";
import {
    SelectChangeEvent,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    Box,
    Chip,
    MenuItem,
} from "@mui/material";

import { TagsEnum } from "../../utils/constants/TagsEnum";

const TagsMultiSelectDropdown
 = () => {
    const tagNames = Object.values(TagsEnum); 
    
    const [tags, setTags] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof tags>) => {
        const value = event.target.value;
        setTags(typeof value === "string" ? value.split(",") : value);
    };

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="multi-chip-tag-label">Tags *</InputLabel>
                <Select
                    labelId="multi-chip-tag-label"
                    id="multi-chip-tag"
                    multiple
                    value={tags}
                    onChange={handleChange}
                    input={
                        <OutlinedInput id="select-multiple-chip" label="Tags *" />
                    }
                    renderValue={(selected) => (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                            }}
                        >
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    {tagNames.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                            {tag}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default TagsMultiSelectDropdown
;
