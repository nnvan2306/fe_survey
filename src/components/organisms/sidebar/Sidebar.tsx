/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuItem, Select } from "@mui/material";
import type {
    OptionType,
    QuestionType,
    SurveyType,
} from "../../../types/survey";
import { SurveyQuestionType } from "../../../constants/question";
import LogicComponent from "../QuestionPage/components/ModalLogic";
import LogicComponentDisplay from "../QuestionPage/components/ModalLogicDisplay";
import type { RangeSliderConfigJsonStringType } from "../RangeSlider/RangeSlider";
import { useMemo } from "react";
import SwitchCustomize from "../QuestionPage/components/SwitchCustomize";
import TimeLimit from "../../molecules/time-limit/TimeLimit";
import Voice from "../../molecules/voice/Voice";

const Sidebar = ({
    question,
    formData,
    setFormData,
    handleUpdateQuestion,
    listComponent,
}: {
    question: QuestionType;
    formData: SurveyType;
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
    listComponent: any;
}) => {
    const handleChangeType = (type: number) => {
        handleUpdateQuestion("questionTypeId", type);
        handleUpdateQuestion("configJsonString", {});
        if (question?.options?.length) {
            handleUpdateQuestion("options", []);
        }
    };

    const isBasic = useMemo(() => formData?.securityModeId === 1, [formData]);
    const isAdvance = useMemo(() => formData?.securityModeId === 2, [formData]);
    const isPro = useMemo(() => formData?.securityModeId === 3, [formData]);
    return (
        <>
            <p>Chọn loại câu hỏi</p>
            <Select
                value={question?.questionTypeId || 0}
                onChange={(e) => handleChangeType(e.target.value)}
                label="Chọn loại câu hỏi"
                className="mb-2"
            >
                {SurveyQuestionType?.map((item) => {
                    return (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    );
                })}
            </Select>
            <SwitchCustomize
                type="required_answer"
                question={question}
                handleUpdateQuestion={handleUpdateQuestion}
                label="Bắt buộc câu trả lời"
            />
            <SwitchCustomize
                question={question}
                handleUpdateQuestion={handleUpdateQuestion}
                label="Gắn nhãn ở đầu câu hỏi"
            />
            <SwitchCustomize
                type="image_end_question"
                question={question}
                handleUpdateQuestion={handleUpdateQuestion}
                label="Hình ảnh/Video ở đầu câu hỏi"
            />

            <Voice
                label="Sử dụng Voice"
                isPro={isPro}
                formData={formData}
                setFormData={setFormData}
                question={question}
                handleUpdateQuestion={handleUpdateQuestion}
            />
            {listComponent &&
                listComponent.map((Item: any) => {
                    return Item.children;
                })}

            {!isBasic ? (
                <>
                    <LogicComponent
                        questions={formData?.questions || []}
                        question={question}
                        handleUpdateQuestion={handleUpdateQuestion}
                    />
                    <LogicComponentDisplay
                        questions={formData?.questions || []}
                        question={question}
                        handleUpdateQuestion={handleUpdateQuestion}
                    />
                </>
            ) : null}

            <TimeLimit
                question={question}
                handleUpdateQuestion={handleUpdateQuestion}
            />
        </>
    );
};

export default Sidebar;
