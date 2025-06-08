import { useEffect } from "react";
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { OptionType, QuestionType } from "../../../types/survey";
/* eslint-enable @typescript-eslint/no-unused-vars */
import ButtonAddAnswer from "../../molecules/buttons/ButtonAddAnswer";
import "./styles.scss";
import { answerDefault } from "../../../constants/question";
import Answer from "../../molecules/answer/Answer";

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

const Ranking = ({ question, handleUpdateQuestion }: Props) => {
    useEffect(() => {
        if (!question?.options?.length) {
            handleUpdateQuestion("options", [{ ...answerDefault, order: 1 }]);
        }
    }, [question, handleUpdateQuestion]);

    const handleUpdateOption = (updatedOption: OptionType) => {
        const updatedOptions = (question?.options || []).map((option) =>
            option.order === updatedOption.order ? updatedOption : option
        );
        handleUpdateQuestion("options", updatedOptions);
    };

    const handleDeleteOption = (orderToDelete: number) => {
        const updatedOptions = (question?.options || []).filter(
            (option) => option.order !== orderToDelete
        );

        handleUpdateQuestion("options", updatedOptions);
    };

    const handleAddAnswer = () => {
        const newOrder = question?.options?.length
            ? Math.max(...question.options.map((o) => o.order)) + 1
            : 1;
        const newOption = { ...answerDefault, order: newOrder };
        const updatedOptions = [...(question?.options || []), newOption];
        handleUpdateQuestion("options", updatedOptions);
    };

    return (
        <div className="ranking flex flex-col gap-2">
            {question?.options?.length
                ? question.options.map((item) => {
                      return (
                          <Answer
                              data={item}
                              key={item.order}
                              handleUpdateOption={handleUpdateOption}
                              handleDeleteOption={handleDeleteOption}
                              isDisableClose={false}
                              formData={{
                                  id: 0,
                                  requesterId: 0,
                                  title: "",
                                  description: "",
                                  surveyTypeId: 0,
                                  surveyTopicId: 0,
                                  surveySpecificTopicId: 0,
                                  surveyStatusId: 0,
                                  securityModeId: 0,
                                  background: "",
                                  configJsonString: {
                                      backgroundGradient1Color: "",
                                      backgroundGradient2Color: "",
                                      titleColor: "",
                                      contentColor: "",
                                      buttonBackgroundColor: "",
                                      buttonContentColor: "",
                                      password: "",
                                      brightness: 0,
                                  },
                                  questions: [],
                                  skipStartPage: false,
                              }}
                          />
                      );
                  })
                : null}
            <ButtonAddAnswer onClick={handleAddAnswer} />
        </div>
    );
};

export default Ranking;
