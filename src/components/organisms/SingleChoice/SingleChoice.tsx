import { useEffect } from "react";
import type {
    OptionType,
    QuestionType,
    SurveyType,
} from "../../../types/survey";
import ButtonAddAnswer from "../../molecules/buttons/ButtonAddAnswer";
import "./styles.scss";
import { answerDefault } from "../../../constants/question";
import Answer from "../../molecules/answer/Answer";

type Props = {
    formData: SurveyType;
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
const SingleChoice = ({ question, handleUpdateQuestion, formData }: Props) => {
    const handleUpdateOption = (updatedOption: OptionType) => {
        const updatedOptions = question.options.map((option) =>
            option.order === updatedOption.order ? updatedOption : option
        );
        handleUpdateQuestion("options", updatedOptions);
    };

    const handleDeleteOption = (orderToDelete: number) => {
        const updatedOptions = question.options.filter(
            (option) => option.order !== orderToDelete
        );
        handleUpdateQuestion("options", updatedOptions);
    };

    const handleAddAnswer = () => {
        const newOrder =
            question.options.length > 0
                ? Math.max(...question.options.map((o) => o.order)) + 1
                : 1;
        const newOption = { ...answerDefault, order: newOrder };
        const updatedOptions = [...question.options, newOption];
        handleUpdateQuestion("options", updatedOptions);
    };

    useEffect(() => {
        if (!question?.options?.length) {
            handleUpdateQuestion("options", [{ ...answerDefault, order: 1 }]);
        }
    }, [question]);

    return (
        <div className="single-choice flex flex-col gap-2">
            {question?.options?.length
                ? question.options.map((item, index) => {
                      return (
                          <Answer
                              isDisableClose={
                                  index === 0 && question?.options?.length === 1
                              }
                              formData={formData}
                              data={item}
                              key={item.order}
                              handleUpdateOption={handleUpdateOption}
                              handleDeleteOption={handleDeleteOption}
                          />
                      );
                  })
                : null}
            <ButtonAddAnswer onClick={handleAddAnswer} />
        </div>
    );
};

export default SingleChoice;
