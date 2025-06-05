/* eslint-disable @typescript-eslint/no-explicit-any */
import type { QuestionType } from "../../../types/survey";

const Sidebar = ({
    question,
    handleUpdateQuestion,
    listComponent,
}: {
    question: QuestionType;
    handleUpdateQuestion: () => void;
    listComponent: any;
}) => {
    return (
        <>
            {listComponent &&
                listComponent.map((Item: any) => {
                    return Item.children;
                })}
        </>
    );
};

export default Sidebar;
