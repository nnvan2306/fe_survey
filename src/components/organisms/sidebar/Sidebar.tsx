/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuItem, Select } from "@mui/material";
import type { OptionType, QuestionType } from "../../../types/survey";
import { SurveyQuestionType } from "../../../constants/question";

const Sidebar = ({
    question,
    handleUpdateQuestion,
    listComponent,
}: {
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
    listComponent: any;
}) => {
    const handleChangeType = (type: number) => {
        handleUpdateQuestion("questionTypeId", type);
    };
    return (
        <>
            <p>Chọn loại câu hỏi</p>
            <Select
                value={question.questionTypeId || 0}
                onChange={(e) => handleChangeType(e.target.value)}
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
        </>
    );
};

export default Sidebar;
