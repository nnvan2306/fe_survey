/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Switch, Typography } from "@mui/material";
import type {
    OptionType,
    QuestionType,
    SurveyType,
} from "../../../types/survey";
import type { RangeSliderConfigJsonStringType } from "../../organisms/RangeSlider/RangeSlider";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";

interface SwitchCustomizeProps {
    label: React.ReactNode;
    question: any;
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
}

const Voice = ({
    label,
    isAdvance,
    question,
    formData,
    setFormData,
    handleUpdateQuestion,
}: SwitchCustomizeProps) => {
    console.log(question?.isVoice);
    const checked = useMemo(() => {
        return question?.isVoice || false;
    }, [question]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            handleUpdateQuestion("isVoice", !checked);
            if (!isAdvance) {
                setFormData((prev) => ({ ...prev, securityModeId: 2 }));
            }
            if (!checked && formData?.securityModeId !== 2) {
                toast("Đã cập nhật Chế độ bảo mật thành Advance");
            }
        },
        [
            checked,
            formData?.securityModeId,
            handleUpdateQuestion,
            isAdvance,
            setFormData,
        ]
    );

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
