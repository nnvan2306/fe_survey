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

const Sidebar = ({
    question,
    formData,
    handleUpdateQuestion,
    listComponent,
}: {
    question: QuestionType;
    formData: SurveyType;
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
    };

    const isBasic = useMemo(() => formData.securityModeId === 1, [formData]);
    // const isAdvance = useMemo(() => formData?.securityModeId === 2, [formData]);
    // const isPro = useMemo(() => formData?.securityModeId === 3, [formData]);
    return (
        <>
            <p>Chọn loại câu hỏi</p>
            <Select
                value={question?.questionTypeId || 0}
                onChange={(e) => handleChangeType(e.target.value)}
                label="Chọn loại câu hỏi"
            >
                {SurveyQuestionType?.map((item) => {
                    return (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    );
                })}
            </Select>
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
        </>
    );
};

export default Sidebar;
