import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button, Tab } from "@mui/material";
import { useState } from "react";
import { HEADER_HEIGHT } from "../../../constants";
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
                    <StartPage formData={formData} setFormData={setFormData} />
                ),
            },
            {
                label: "Bảng Hỏi",
                value: 1,
                component: (
                    <QuestionPage formData={formData} setFormData={setFormData} />
                ),
            },
            { label: "Trang Kết Thúc", value: 2, component: <EndPage formData={formData} setFormData={setFormData} /> },
            { label: "Hoàn Tất", value: 3, component: <CompletePage formData={formData} setFormData={setFormData} /> },
            { label: "Chia Sẻ", value: 4, component: <SharePage formData={formData} setFormData={setFormData} /> },
            {
                label: "Báo cáo",
                value: 5,
                component: <ReportPage formData={formData} setFormData={setFormData} />,
                disabled: true,
            },
        ];

    const ActiveComponent = tabs[activeTab].component;

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
                        <Button variant="contained" className="btn-save">
                            Đã lưu
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
