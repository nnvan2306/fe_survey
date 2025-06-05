import type { OptionType, QuestionType } from "../../../../../types/survey";
import "./styles.scss";

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

const RatingIcon = ({ question, handleUpdateQuestion }: Props) => {
    return <div className=""></div>;
};

export default RatingIcon;
