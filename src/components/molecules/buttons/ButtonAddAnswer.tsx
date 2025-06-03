import "./styles.scss";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

type Props = {
    onClick: () => void;
};

const ButtonAddAnswer = ({ onClick }: Props) => {
    return (
        <Button
            className="button-add-answer flex items-center gap-1 justify-start"
            onClick={onClick}
        >
            <div className="add-icon-container">
                <AddIcon />
            </div>
            Thêm câu trả lời
        </Button>
    );
};

export default ButtonAddAnswer;
