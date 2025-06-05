import type { SurveyType } from "../../../types/survey";
import "./styles.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type Props = {
    formData: SurveyType;
};

const EndPage = ({ formData }: Props) => {
    return (
        <div
            className="min-h-[100%] question-main flex-1 flex flex-col overflow-y-auto relative items-center justify-center"
            style={{
                ...(formData.background.startsWith("/") && {
                    backgroundImage: `url(${formData.background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: `brightness(${
                        formData.configJsonString.brightness / 100
                    })`,
                    backgroundColor: "transparent",
                }),
                ...(formData.background === "color_gradient" && {
                    background: `linear-gradient(to right, ${formData.configJsonString.backgroundGradient1Color}, ${formData.configJsonString.backgroundGradient2Color})`,
                    filter: `brightness(${
                        formData.configJsonString.brightness / 100
                    })`,
                }),
                ...(formData.background.startsWith("#") && {
                    backgroundColor: formData.background,
                    filter: `brightness(${
                        formData.configJsonString.brightness / 100
                    })`,
                }),
            }}
        >
            <Box className="flex flex-col items-center space-y-4">
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: "50%",
                        width: "80px",
                        height: "80px",
                        minWidth: "unset",
                        backgroundColor: "white",
                        "&:hover": {
                            backgroundColor: "#f0f0f0",
                        },
                    }}
                >
                    <PlayArrowIcon sx={{ fontSize: 50, color: "black" }} />
                </Button>
                <Typography variant="h6" sx={{ color: "white" }}>
                    Chạy thử khảo sát
                </Typography>
            </Box>
        </div>
    );
};

export default EndPage;
