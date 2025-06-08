import { Box, Input, Switch, Typography } from "@mui/material";
import type {
    OptionType,
    QuestionType,
    SurveyType,
} from "../../../types/survey";
import type { RangeSliderConfigJsonStringType } from "../../organisms/RangeSlider/RangeSlider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    question: QuestionType;
    formData: SurveyType;
    isAdvance: boolean;
    setFormData: React.Dispatch<React.SetStateAction<SurveyType>>;
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

const TimeLimit = ({
    question,
    handleUpdateQuestion,
    formData,
    isAdvance,
    setFormData,
}: Props) => {
    const [isOpen, setIsOpne] = useState(false);
    const value = useMemo(() => Number(question?.timeLimit) || 0, [question]);

    const handleChangeSwitch = useCallback(() => {
        if (isOpen) {
            handleUpdateQuestion("timeLimit", 0);
        }
        if (!isOpen && !isAdvance) {
            setFormData((prev) => ({ ...prev, securityModeId: 2 }));
            toast("Đã cập nhật Chế độ bảo mật thành Advance");
        }
        setIsOpne(!isOpen);
    }, [handleUpdateQuestion, isAdvance, isOpen, setFormData]);

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
        <div className="w-full mb-2">
            <div>
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
