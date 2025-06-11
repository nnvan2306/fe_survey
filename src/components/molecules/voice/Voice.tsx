/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Switch, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import type {
    OptionType,
    QuestionType,
    SurveyType,
} from "../../../types/survey";
import type { RangeSliderConfigJsonStringType } from "../../organisms/RangeSlider/RangeSlider";

interface SwitchCustomizeProps {
    label: React.ReactNode;
    question: any;
    isPro: boolean;
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
}

const Voice = ({
    label,
    isPro,
    question,
    setFormData,
    handleUpdateQuestion,
}: SwitchCustomizeProps) => {
    console.log(question?.isVoice);
    const checked = useMemo(() => {
        return question?.isVoice || false;
    }, [question]);

    const handleChange = useCallback(() => {
        Swal.fire({
            title: checked
                ? "Bạn muốn tắt chế độ ghi âm ?"
                : "Bạn muốn bật chế độ ghi âm ?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            html: `
                <div>
                <p><strong>Pro</strong></p>
                <p>Random captcha giữa những câu hỏi. Random Re-question câu hỏi bất kỳ cho bài khảo sát. Chủ động điều chỉnh Time-limit cho từng câu hỏi. Cơ chế Jump Logic giúp khảo sát được liền mạch và chắt lọc thông tin hơn. Tính năng set voice-answer cho câu hỏi</p>
            </div>
            `
        }).then((result) => {
            if (result.isConfirmed) {
                handleUpdateQuestion("isVoice", !checked);
                if (!isPro) {
                    setFormData((prev) => ({ ...prev, securityModeId: 3 }));
                }
                if (!checked && !isPro) {
                    toast("Đã cập nhật Chế độ bảo mật thành Pro");
                }
            }
        });
    }, [checked, handleUpdateQuestion, isPro, setFormData]);

    return (
        <div className="">
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
        </div>
    );
};
export default Voice;
