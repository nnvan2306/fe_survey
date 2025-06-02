import "./styles.scss";
import ButtonAddAnswer from "../buttons/ButtonAddAnswer";
import type { OptionType, QuestionType } from "../../../types/survey";
import { useCallback, useEffect } from "react";

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
    ) => void;
};
const optionDefault = {
    order: 1,
    content: "",
};
const ShortSentences = ({ question, handleUpdateQuestion }: Props) => {
    const handleAddOption = useCallback(() => {
        handleUpdateQuestion("options", [
            ...question.options,
            { ...optionDefault, order: question.options.length + 1 },
        ]);
    }, [handleUpdateQuestion, question.options]);

    useEffect(() => {
        if (!question?.options?.length) {
            handleUpdateQuestion("options", [optionDefault]);
        }
    }, [handleUpdateQuestion, question]);
    return (
        <div className="short-sentences-container">
            {question?.options?.length
                ? question.options.map((item, index) => {
                      return (
                          <input
                              key={index}
                              type="text"
                              disabled
                              placeholder="Vui lòng nhập tại đây"
                              className="text-input"
                          />
                      );
                  })
                : null}
            <ButtonAddAnswer onClick={() => handleAddOption()} />{" "}
        </div>
    );
};

export default ShortSentences;
