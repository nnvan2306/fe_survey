import ClearIcon from "@mui/icons-material/Clear";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import type { ChangeEvent } from "react";
import type { OptionType } from "../../../types/survey";
import "./styles.scss";

type Props = {
    data: OptionType;
    handleUpdateOption: (updatedOption: OptionType) => void;
    handleDeleteOption: (orderToDelete: number) => void;
    isDisableClose: boolean;
};
const Answer = ({
    data,
    handleUpdateOption,
    handleDeleteOption,
    isDisableClose,
}: Props) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleUpdateOption({ ...data, content: event.target.value });
    };

    const handleDelete = () => {
        handleDeleteOption(data.order);
    };

    return (
        <div className="answer-container flex items-center">
            <TextField
                value={data.content}
                variant="outlined"
                size="small"
                className="answer-input flex-grow"
                placeholder="Nhập câu trả lời tại đây"
                onChange={handleChange}
            />
            <IconButton
                size="small"
                onClick={handleDelete}
                style={{
                    display: isDisableClose ? "none" : "block",
                }}
            >
                <ClearIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" className="settings-button !hidden">
                <SettingsIcon fontSize="small" />
            </IconButton>
        </div>
    );
};

export default Answer;
