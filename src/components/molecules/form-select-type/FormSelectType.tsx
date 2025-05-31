import "./styles.scss";
import { Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ImageIcon from "@mui/icons-material/Image";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import StarIcon from "@mui/icons-material/Star";
import TuneIcon from "@mui/icons-material/Tune";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import StorageIcon from "@mui/icons-material/Storage";
import BarChartIcon from "@mui/icons-material/BarChart";

const questionTypes = [
    {
        id: "multiple-choice",
        label: "Multiple Choice",
        icon: <CheckCircleOutlineIcon />,
    },
    { id: "picture-choice", label: "Picture Choice", icon: <ImageIcon /> },
    { id: "form", label: "Form", icon: <TextFieldsIcon /> },
    { id: "rating", label: "Rating", icon: <StarIcon /> },
    { id: "slider", label: "Slider", icon: <TuneIcon /> },
    { id: "ranking", label: "Ranking", icon: <BarChartIcon /> },
    { id: "upload-file", label: "Upload file", icon: <CloudUploadIcon /> },
    { id: "db-lookup", label: "DB Lookup", icon: <StorageIcon /> },
];

const FormSelectType = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="form-select-type-grid grid grid-cols-2 gap-6">
                {questionTypes.map((type) => (
                    <div
                        key={type.id}
                        className="form-select-type-card flex flex-col items-center justify-center p-4 cursor-pointer"
                    >
                        <div className="form-select-type-icon mb-2">
                            {type.icon}
                        </div>
                        <Typography
                            variant="body1"
                            className="form-select-type-label text-center"
                        >
                            {type.label}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormSelectType;
