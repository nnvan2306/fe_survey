import type { QuestionType } from "../../../types/survey";
import "./styles.scss";

type Props = {
    data: QuestionType;
    handleUpdateQuestion: (
        key: keyof QuestionType,
        value: string | number | boolean | Record<string, string | number>
    ) => void;
};
const SingleChoice = ({ data, handleUpdateQuestion }: Props) => {
    return <div className="single-choice"></div>;
};

export default SingleChoice;
