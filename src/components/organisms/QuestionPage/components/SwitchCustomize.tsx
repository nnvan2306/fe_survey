/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { Box, Switch, Typography } from "@mui/material";

interface SwitchCustomizeProps {
    label: React.ReactNode;
    question: any;
    handleUpdateQuestion: Function;
    isMinMax?: boolean
}

export default function SwitchCustomize({
    isMinMax = false,
    label,
    question,
    handleUpdateQuestion
}: SwitchCustomizeProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleUpdateQuestion(event.target.checked);
    };

    return (
        <div style={{
            border: `${isMinMax ? "1px solid #ccc" : ""}`,
            borderRadius: 10
        }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    minHeight: '20px'

                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 600,
                        color: '#000',
                        fontSize: '12px'
                    }}
                >
                    {label}
                </Typography>

                <Switch
                    checked={question || false}
                    onChange={handleChange}
                />
            </Box>
            {isMinMax ?
                <Box padding={"10px"} paddingLeft={"40px"}>
                    <input placeholder="Chọn ít nhất câu trả lời" style={{
                        height: 20,
                        fontSize: 12,
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        display: "block",
                        padding: "10px 10px",
                        width: "100%",
                        background: "#f5f5f5",
                        outline: "none"
                    }} />
                    <div style={{
                        height: 4,
                        width: "100%"
                    }}></div>
                    <input placeholder="Chọn nhiều nhất câu trả lời" style={{
                        height: 20,
                        fontSize: 12,
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        padding: "10px 10px",
                        display: "block",
                        width: "100%",
                        background: "#f5f5f5",
                        outline: "none"
                    }} />
                </Box> : ""}
        </div>
    );
}