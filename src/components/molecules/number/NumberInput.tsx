import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const NumberInput = () => {
    return (
        <Box className="number-input w-full">
            <TextField
                disabled
                fullWidth
                placeholder="Vui lòng nhập số"
                variant="outlined"
                size="small"
            />
        </Box>
    );
};

export default NumberInput;
