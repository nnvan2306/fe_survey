/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { Box, Switch, Typography } from "@mui/material";
import { useMemo } from "react";
import type { OptionType, QuestionType } from "../../../../types/survey";
import type { RangeSliderConfigJsonStringType } from "../../RangeSlider/RangeSlider";

interface SwitchCustomizeProps {
    label: React.ReactNode;
    question: any;
    handleUpdateQuestion: (
        key: keyof QuestionType,
        value:
            | string
            | number
            | boolean
            | OptionType[]
            | Record<string, string | number>
            | RangeSliderConfigJsonStringType
            | Record<string, unknown>
    ) => void;
    isMinMax?: boolean;
    type?: string;
}

export default function SwitchCustomize({
    isMinMax = false,
    label,
    question,
    handleUpdateQuestion,
    type = "",
}: SwitchCustomizeProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        handleUpdateQuestion("configJsonString", {
            ...question.configJsonString,
            [type]: value,
        });
    };

    const checked = useMemo(() => {
        return question?.configJsonString[type] || false;
    }, [question, type]);

    const valueMinMax = useMemo(() => {
        if (type === "is_choose_muitiple") {
            return (
                question?.configJsonString?.valueMinMax || {
                    min: 0,
                    max: 0,
                }
            );
        }
    }, [question, type]);

    const handleChangeInputMin = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        handleUpdateQuestion("configJsonString", {
            ...question.configJsonString,
            valueMinMax: {
                min: value,
                max: question?.configJsonString?.valueMinMax?.max,
            },
        });
    };

    const handleChangeInputMax = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        handleUpdateQuestion("configJsonString", {
            ...question.configJsonString,
            valueMinMax: {
                max: value,
                min: question?.configJsonString?.valueMinMax?.min,
            },
        });
    };

    return (
        <div
            className="mb-2"
            style={{
                border: `${isMinMax ? "1px solid #ccc" : ""}`,
                borderRadius: 10,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    minHeight: "20px",
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 600,
                        color: "#000",
                        fontSize: "14px",
                    }}
                >
                    {label}
                </Typography>

                <Switch checked={checked} onChange={handleChange} />
            </Box>
            {isMinMax && checked ? (
                <Box padding={"10px"} paddingLeft={"40px"}>
                    <input
                        onChange={handleChangeInputMin}
                        placeholder="Chọn ít nhất câu trả lời"
                        style={{
                            height: 32,
                            fontSize: 12,
                            border: "1px solid #ccc",
                            borderRadius: 6,
                            display: "block",
                            padding: "10px 10px",
                            width: "100%",
                            background: "#f5f5f5",
                            outline: "none",
                        }}
                        type="number"
                        min={"0"}
                        value={valueMinMax.min}
                    />
                    <div
                        style={{
                            height: 4,
                            width: "100%",
                        }}
                    ></div>
                    <input
                        onChange={handleChangeInputMax}
                        type="number"
                        min={"0"}
                        placeholder="Chọn nhiều nhất câu trả lời"
                        style={{
                            height: 32,
                            fontSize: 12,
                            border: "1px solid #ccc",
                            borderRadius: 6,
                            padding: "10px 10px",
                            display: "block",
                            width: "100%",
                            background: "#f5f5f5",
                            outline: "none",
                        }}
                        value={valueMinMax.max}
                    />
                </Box>
            ) : (
                ""
            )}
        </div>
    );
}
