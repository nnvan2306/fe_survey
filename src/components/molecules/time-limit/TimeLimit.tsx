import { Box, Input, Switch, Typography } from "@mui/material";
import type {
    OptionType,
    QuestionType,
    SurveyType,
} from "../../../types/survey";
import type { RangeSliderConfigJsonStringType } from "../../organisms/RangeSlider/RangeSlider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type Props = {
    question: QuestionType;
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
    isAdvance,
    setFormData,
}: Props) => {
    const [isOpen, setIsOpne] = useState(false);
    const value = useMemo(() => Number(question?.timeLimit) || 0, [question]);

    const action = useCallback(() => {
        if (isOpen) {
            handleUpdateQuestion("timeLimit", 0);
        }
        if (!isOpen && !isAdvance) {
            setFormData((prev) => ({ ...prev, securityModeId: 2 }));
            toast("Đã cập nhật Chế độ bảo mật thành Advance");
        }
        setIsOpne(!isOpen);
    }, [handleUpdateQuestion, isAdvance, isOpen, setFormData]);

    const handleChangeSwitch = () => {
        if (isAdvance) {
            action();
            return;
        }

        Swal.fire({
            title: isOpen
                ? "Bạn muốn tắt Giới hạn thời gian câu hỏi?"
                : "Bạn muốn bật Giới hạn thời gian câu hỏi ?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            html: `
                <div style="text-align: left; padding: 15px; font-family: Arial, sans-serif;">
                    <div style="margin-bottom: 15px;">
                        <p style="font-size: 16px; font-weight: bold; color: #333;">Basic</p>
                        <p style="font-size: 14px;">6 loại câu hỏi để bạn tha hồ tùy chỉnh khảo sát. Random captcha giữa những câu hỏi. Random Time-limit cho câu hỏi.</p>
                    </div>
                    <div style="background-color: #4caf50; color: #ffffff; padding: 10px; border-radius: 5px;">                   
                        <p style="font-size: 16px; font-weight: bold;">Advance</p>
                        <p style="font-size: 14px;">6 loại câu hỏi để bạn tha hồ tùy chỉnh khảo sát. Random captcha giữa những câu hỏi. Random Re-question câu hỏi bất kỳ cho bài khảo sát. Chủ động điều chỉnh Time-limit cho từng câu hỏi. Cơ chế Jump Logic giúp khảo sát được liền mạch và chắt lọc thông tin hơn.</p>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <p style="font-size: 16px; font-weight: bold; color: #333;">Pro</p>
                        <p style="font-size: 14px;">6 loại câu hỏi để bạn tha hồ tùy chỉnh khảo sát. Random captcha giữa những câu hỏi. Random Re-question câu hỏi bất kỳ cho bài khảo sát. Chủ động điều chỉnh Time-limit cho từng câu hỏi. Cơ chế Jump Logic giúp khảo sát được liền mạch và chắt lọc thông tin hơn. Tính năng set voice-answer cho câu hỏi.</p>
                    </div>
                </div>
            `,
        }).then((result) => {
            if (result.isConfirmed) {
                action();
            }
        });
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
