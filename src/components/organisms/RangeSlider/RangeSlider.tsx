import { useCallback, useEffect, useState } from "react";
import type { OptionType, QuestionType } from "../../../types/survey";
import "./styles.scss";
import { Box, Slider, TextField, Typography } from "@mui/material";

type SliderDataType = {
    min: number;
    max: number;
    step: number;
    unit: string;
};

export type RangeSliderConfigJsonStringType = {
    data: SliderDataType;
};

type Props = {
    question: QuestionType & {
        configJsonString?: RangeSliderConfigJsonStringType;
    };
    handleUpdateQuestion: (
        key: keyof QuestionType,
        value:
            | string
            | number
            | boolean
            | OptionType[]
            | RangeSliderConfigJsonStringType
            | Record<string, unknown>
    ) => void;
};

const defaultData: SliderDataType = {
    min: 1,
    max: 10,
    step: 1,
    unit: "",
};

const RangeSlider = ({ question, handleUpdateQuestion }: Props) => {
    const [value, setValue] = useState<number[]>([
        defaultData.min,
        defaultData.max,
    ]);

    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleRangeConfigChange = useCallback(
        (key: keyof SliderDataType, newValue: SliderDataType[typeof key]) => {
            if (typeof handleUpdateQuestion !== "function") return;

            const currentData = question?.configJsonString?.data || defaultData;
            handleUpdateQuestion("configJsonString", {
                ...question?.configJsonString,
                data: {
                    ...currentData,
                    [key]: newValue,
                },
            });
        },
        [handleUpdateQuestion, question?.configJsonString]
    );

    useEffect(() => {
        const config = question?.configJsonString;
        const isEmptyConfigObject =
            config &&
            typeof config === "object" &&
            Object.keys(config).length === 0;
        const isDataMissing = !config?.data;

        if (isEmptyConfigObject || isDataMissing) {
            if (typeof handleUpdateQuestion === "function") {
                handleUpdateQuestion("configJsonString", {
                    data: { ...defaultData },
                });
                setValue([defaultData.min, defaultData.max]);
            }
        } else {
            setValue([config.data.min, config.data.max]);
        }
    }, [question?.configJsonString, handleUpdateQuestion]);

    const currentData = question?.configJsonString?.data || defaultData;

    return (
        <div className="range-slider">
            <Box className="range-slider-item flex flex-col gap-4">
                <Box className="flex flex-col items-center w-full">
                    <Box className="flex justify-between w-full px-1 mb-2">
                        <Typography variant="body2" color="white">
                            {currentData.min}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="white"
                            sx={{
                                flexGrow: 1,
                                textAlign: "center",
                            }}
                        >
                            {currentData.step}
                        </Typography>
                        <Typography variant="body2" color="white">
                            {currentData.max}
                        </Typography>
                    </Box>
                    <Slider
                        value={value}
                        onChange={handleSliderChange}
                        aria-labelledby="range-slider"
                        valueLabelDisplay="auto"
                        min={currentData.min}
                        max={currentData.max}
                        step={currentData.step}
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
                            value={currentData.min}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                handleRangeConfigChange(
                                    "min",
                                    Number(e.target.value)
                                )
                            }
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
                            value={currentData.step}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                handleRangeConfigChange(
                                    "step",
                                    Number(e.target.value)
                                )
                            }
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
                            value={currentData.max}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                handleRangeConfigChange(
                                    "max",
                                    Number(e.target.value)
                                )
                            }
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
                            value={currentData.unit}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                handleRangeConfigChange("unit", e.target.value)
                            }
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
        </div>
    );
};

export default RangeSlider;
