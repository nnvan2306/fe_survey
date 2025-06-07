import { Box, Input, Switch, Typography } from "@mui/material";
import type { OptionType, QuestionType } from "../../../types/survey";
import type { RangeSliderConfigJsonStringType } from "../../organisms/RangeSlider/RangeSlider";
import { useEffect, useMemo, useState } from "react";

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
            | RangeSliderConfigJsonStringType
            | Record<string, unknown>
    ) => void;
};

const TimeLimit = ({ question, handleUpdateQuestion }: Props) => {
    const [isOpen, setIsOpne] = useState(false);
    const value = useMemo(() => Number(question?.timeLimit) || 0, [question]);

    const handleChangeSwitch = () => {
        if (isOpen) {
            handleUpdateQuestion("timeLimit", 0);
        }
        setIsOpne(!isOpen);
    };

    const handleChangeValue = (value: number) => {
        handleUpdateQuestion("timeLimit", value);
    };

    useEffect(() => {
        if (Boolean(question?.timeLimit) && !isOpen) {
            setIsOpne(true);
        }
        if (!question?.timeLimit && isOpen) {
            setIsOpne(false);
        }
    }, [question?.order]);
    return (
        <div className="w-full">
            <div>
                {/* <SwitchCustomize
                    question={question}
                    handleUpdateQuestion={handleUpdateQuestion}
                    label="Giới hạn thời gian câu hỏi này"
                /> */}
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
                            fontSize: "12px",
                        }}
                    >
                        Giới hạn thời gian câu hỏi này
                    </Typography>

                    <Switch checked={isOpen} onChange={handleChangeSwitch} />
                </Box>
                {isOpen ? (
                    <>
                        <Input
                            className="w-full px-2 border-[1px] border-[#ccc] border-solid"
                            placeholder="Thời gian (giây)"
                            value={value}
                            type="number"
                            onChange={(e) =>
                                handleChangeValue(Number(e.target.value))
                            }
                        />
                        <p>{value} giây</p>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default TimeLimit;
