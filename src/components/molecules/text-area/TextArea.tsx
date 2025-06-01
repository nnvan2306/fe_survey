import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const TextArea = () => {
    return (
        <Box className="text-area w-full">
            <TextField
                disabled
                fullWidth
                multiline
                rows={4} // Adjust rows as needed for initial height
                placeholder="Vui lòng nhập tại đây"
                variant="outlined"
                size="small"
            />
        </Box>
    );
};

export default TextArea;
