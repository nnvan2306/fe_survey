import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HEADER_HEIGHT } from "../../../constants";
import useBlocker from "../../../hooks/useBlocker";
import { useCreateQuestion } from "../../../services/ToDo/mutation.service";
import type { SurveyType } from "../../../types/survey";
import CompletePage from "../../organisms/CompletePage/CompletePage";
import EndPage from "../../organisms/EndPage/EndPage";
import QuestionPage from "../../organisms/QuestionPage/QuestionPage";
import ReportPage from "../../organisms/ReportPage/ReportPage";
import SharePage from "../../organisms/SharePage/SharePage";
import StartPage from "../../organisms/StartPage/StartPage";
import MainTemPlate from "../../templates/MainTemPlate";
import "./styles.scss";

const defaultValue = {
    id: 1,
    requesterId: 10,
    title: "",
    description: "",
    surveyTypeId: 1,
    surveyTopicId: 2,
    surveySpecificTopicId: 5,
    surveyStatusId: 1,
    securityModeId: 2,
    background: "/assets/start1.webp",
    configJsonString: {
        backgroundGradient1Color: "#ffffff",
        backgroundGradient2Color: "#f0f0f0",
        titleColor: "#000000",
        contentColor: "#333333",
        buttonBackgroundColor: "#007bff",
        buttonContentColor: "#ffffff",
        password: "123456",
        brightness: 100,
    },
    questions: [],
    skipStartPage: false,
};
const SurveyNew = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState<SurveyType>(defaultValue);
    const [isSaving, setIsSaving] = useState(false);
    const [saveCountdown, setSaveCountdown] = useState(0);
    const [hasChanges, setHasChanges] = useState(false);

    const handleTabClick = (tabValue: number) => {
        setActiveTab(tabValue);
    };

    const tabs: {
        label: string;
        value: number;
        component: React.ReactNode;
        disabled?: boolean;
    }[] = [
            {
                label: "Trang Bắt Đầu",
                value: 0,
                component: (
                    <StartPage formData={formData} setFormData={setFormData} handleTabClick={handleTabClick} />
                ),
            },
            {
                label: "Bảng Hỏi",
                value: 1,
                component: (
                    <QuestionPage formData={formData} setFormData={setFormData} />
                ),
            },
            { label: "Trang Kết Thúc", value: 2, component: <EndPage /> },
            { label: "Hoàn Tất", value: 3, component: <CompletePage /> },
            { label: "Chia Sẻ", value: 4, component: <SharePage formData={formData} setFormData={setFormData} handleTabClick={handleTabClick} /> },
            {
                label: "Báo cáo",
                value: 5,
                component: <ReportPage />,
                disabled: true,
            },
        ];

    const ActiveComponent = tabs[activeTab].component;

    useBlocker(true);

    const { mutate } = useCreateQuestion({
        mutationConfig: {
            onSuccess: () => {
                toast("Bạn đã lưu thành công thay đổi!");
            },
        },
    });

    useEffect(() => {
        setHasChanges(true);
        setIsSaving(false);
        setSaveCountdown(0);

        const timer = setTimeout(() => {
            handleSave();
        }, 5000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, activeTab]);

    const handleSave = async () => {
        setIsSaving(true);
        setHasChanges(false);
        setSaveCountdown(5);

        for (let i = 5; i > 0; i--) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSaveCountdown(i - 1);
        }

        // Simulate API call
        mutate(formData);
        setIsSaving(false);
    };

    return (
        <MainTemPlate>
            <div
                style={{
                    maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
                    overflow: "hidden",
                }}
                className={`flex flex-col`}
            >
                <div className="survey-header">
                    <div className="survey-tabs">
                        {tabs.map((tab, index) => (
                            <div key={tab.value} className="tab-item">
                                <Tab
                                    label={tab.label}
                                    disabled={tab.disabled}
                                    className={
                                        activeTab === tab.value
                                            ? "tab-active"
                                            : "tab-inactive"
                                    }
                                    onClick={() =>
                                        !tab.disabled &&
                                        handleTabClick(tab.value)
                                    }
                                />
                                {index < tabs.length - 1 && (
                                    <NavigateNextIcon
                                        className="tab-separator"
                                        fontSize="small"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="survey-actions">
                        <Button
                            variant="contained"
                            className="btn-save"
                            sx={{
                                ...(hasChanges &&
                                    !isSaving && {
                                    backgroundColor: "#cccccc",
                                    color: "#000000",
                                    "&:hover": {
                                        backgroundColor: "#bbbbbb",
                                    },
                                }),
                            }}
                        >
                            {isSaving
                                ? `Đang lưu ... ${saveCountdown}`
                                : hasChanges
                                    ? "Lưu thay đổi"
                                    : "Đã lưu"}
                        </Button>
                        <Button variant="outlined">Tác vụ khác</Button>
                    </div>
                </div>
                <div
                    className="survey-content"
                    style={{
                        height: `calc(100vh - ${HEADER_HEIGHT}px - 60px)`,
                        overflow: "auto",
                    }}
                >
                    {ActiveComponent}
                </div>
            </div>
        </MainTemPlate>
    );
};

export default SurveyNew;
