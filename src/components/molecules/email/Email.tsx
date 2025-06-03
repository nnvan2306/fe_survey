import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Email = () => {
    return (
        <Box className="email-input w-full">
            <TextField
                disabled
                fullWidth
                placeholder="Nhập email tại đây"
                variant="outlined"
                size="small"
            />
        </Box>
    );
};

export default Email;
