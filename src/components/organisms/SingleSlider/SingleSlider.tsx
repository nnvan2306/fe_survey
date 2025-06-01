import "./styles.scss";
import React, { useCallback, useMemo, useState } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { OptionType, QuestionType } from "../../../types/survey";

type Props = {
    question: QuestionType;
    handleUpdateQuestion: (
        key: keyof QuestionType,
        value:
            | string
            | number
            | boolean
            | OptionType[]
            | Record<string, string | number>
    ) => void;
};

const SingleSlider = ({ question, handleUpdateQuestion }: Props) => {
    const [value, setValue] = useState(
        Number(question?.configJsonString?.max) || 10
    );
    const min = useMemo(
        () => Number(question?.configJsonString?.min) || 0,
        [question]
    );
    const max = useMemo(
        () => Number(question?.configJsonString?.max) || 0,
        [question]
    );
    const step = useMemo(
        () => Number(question?.configJsonString?.step) || 0,
        [question]
    );
    const unit = useMemo(
        () => question?.configJsonString?.unit || "",
        [question]
    );
    const handleSliderChange = (event: Event, newValue: number) => {
        setValue(newValue);
    };

    const handleMinChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(event.target.value);
            if (value >= max) {
                return;
            }
            handleUpdateQuestion("configJsonString", {
                ...question.configJsonString,
                min: value,
            });
        },
        [handleUpdateQuestion, max, question.configJsonString]
    );

    const handleMaxChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(event.target.value);
            if (value <= min) {
                return;
            }
            handleUpdateQuestion("configJsonString", {
                ...question.configJsonString,
                max: value,
            });
        },
        [handleUpdateQuestion, min, question.configJsonString]
    );

    const handleStepChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(event.target.value);
            if (value >= max - min) {
                return;
            }
            handleUpdateQuestion("configJsonString", {
                ...question.configJsonString,
                step: event.target.value,
            });
        },
        [handleUpdateQuestion, max, min, question.configJsonString]
    );

    const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleUpdateQuestion("configJsonString", {
            ...question.configJsonString,
            unit: event.target.value,
        });
    };

    return (
        <Box className="single-slider bg-gray-500 p-6 rounded-lg flex flex-col gap-6">
            {/* Slider and Labels */}
            <Box className="flex flex-col items-center w-full">
                <Box className="flex justify-between w-full px-1 mb-2">
                    <Typography variant="body2" color="white">
                        {min}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="white"
                        sx={{ flexGrow: 1, textAlign: "center" }}
                    >
                        {step}
                    </Typography>
                    <Typography variant="body2" color="white">
                        {max}
                    </Typography>
                </Box>
                <Slider
                    value={value}
                    onChange={handleSliderChange}
                    aria-labelledby="single-slider"
                    valueLabelDisplay="auto"
                    min={min}
                    max={max}
                    step={step}
                    sx={{
                        "& .MuiSlider-thumb": {
                            width: 24,
                            height: 24,
                            "&:focus, &:hover, &.Mui-active": {
                                boxShadow: "inherit",
                            },
                        },
                    }}
                />
            </Box>

            <Box className="flex justify-between gap-4">
                <Box>
                    <Typography color="white" mb={2}>
                        Min
                    </Typography>
                    <TextField
                        type="number"
                        value={min}
                        onChange={handleMinChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            flexGrow: 1,
                            backgroundColor: "white",
                            borderRadius: 1,
                        }}
                    />
                </Box>
                <Box>
                    <Typography color="white" mb={2}>
                        Step
                    </Typography>
                    <TextField
                        type="number"
                        value={step}
                        onChange={handleStepChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            flexGrow: 1,
                            backgroundColor: "white",
                            borderRadius: 1,
                        }}
                    />
                </Box>
                <Box>
                    <Typography color="white" mb={2}>
                        Max
                    </Typography>
                    <TextField
                        type="number"
                        value={max}
                        onChange={handleMaxChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            flexGrow: 1,
                            backgroundColor: "white",
                            borderRadius: 1,
                        }}
                    />
                </Box>
                <Box>
                    <Typography color="white" mb={2}>
                        Unit
                    </Typography>
                    <TextField
                        value={unit}
                        onChange={handleUnitChange}
                        InputLabelProps={{ shrink: true }}
                        placeholder="Đơn vị"
                        sx={{
                            flexGrow: 1,
                            backgroundColor: "white",
                            borderRadius: 1,
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default SingleSlider;
