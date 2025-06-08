import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button, Tab } from "@mui/material";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";
import { HEADER_HEIGHT } from "../../../constants";
import useBlocker from "../../../hooks/useBlocker";
import { useUpdateSurvey } from "../../../services/survey/update";
import type { SurveyType } from "../../../types/survey";
import CompletePage from "../../organisms/CompletePage/CompletePage";
import EndPage from "../../organisms/EndPage/EndPage";
import QuestionPage from "../../organisms/QuestionPage/QuestionPage";
import ReportPage from "../../organisms/ReportPage/ReportPage";
import SharePage from "../../organisms/SharePage/SharePage";
import StartPage from "../../organisms/StartPage/StartPage";
import MainTemPlate from "../../templates/MainTemPlate";

import { useParams } from "react-router-dom";
import { useGetSurvey } from "../../../services/survey/get";
import "./styles.scss";

const defaultValue = {
    id: 999,
    requesterId: 10,
    title: "",
    description: "",
    surveyTypeId: 1,
    surveyTopicId: 2,
    surveySpecificTopicId: 5,
    surveyStatusId: 1,
    securityModeId: 1,
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
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState<SurveyType>(defaultValue);
    const [isSaving, setIsSaving] = useState(false);
    const [saveCountdown, setSaveCountdown] = useState(0);
    const [hasChanges, setHasChanges] = useState(false);
    const latestDataRef = useRef(formData);
    const timeoutRef = useRef<number | null>(null);
    const countdownRef = useRef<number | null>(null);

    const { data } = useGetSurvey({ id: Number(id) || 0 });

    const handleTabClick = (tabValue: number) => {
        setActiveTab(tabValue);
    };

    const tabs = [
        {
            label: "Trang Bắt Đầu",
            value: 0,
            component: (
                <StartPage
                    formData={formData}
                    setFormData={setFormData}
                    handleTabClick={handleTabClick}
                />
            ),
        },
        {
            label: "Bảng Hỏi",
            value: 1,
            component: (
                <QuestionPage formData={formData} setFormData={setFormData} />
            ),
        },
        {
            label: "Trang Kết Thúc",
            value: 2,
            component: <EndPage formData={formData} />,
        },
        {
            label: "Hoàn Tất",
            value: 3,
            component: <CompletePage formData={formData} />,
        },
        {
            label: "Chia Sẻ",
            value: 4,
            component: <SharePage formData={formData} />,
        },
        {
            label: "Báo cáo",
            value: 5,
            component: <ReportPage />,
            disabled: true,
        },
    ];

    const ActiveComponent = tabs[activeTab].component;

    const { mutate } = useUpdateSurvey({
        mutationConfig: {
            onSuccess(newData) {
                setFormData(newData.data);
                latestDataRef.current = newData.data;
                if (!id) {
                    window.history.pushState(
                        {},
                        "",
                        `/survey/update/${newData.data.id}`
                    );
                }
            },
        },
    });

    const handleSave = () => {
        setIsSaving(true);
        setHasChanges(false);
        let seconds = 5;
        setSaveCountdown(seconds);

        countdownRef.current = setInterval(() => {
            seconds--;
            setSaveCountdown(seconds);
            if (seconds <= 0 && countdownRef.current) {
                clearInterval(countdownRef.current);
            }
        }, 1000);

        timeoutRef.current = setTimeout(() => {
            mutate({ ...latestDataRef.current, type: "update" });
            setIsSaving(false);
            timeoutRef.current = null;
            countdownRef.current = null;
        }, 5000);
    };

    useEffect(() => {
        if (!isEqual(latestDataRef.current, formData)) {
            latestDataRef.current = formData;
            setHasChanges(true);
            console.log("run");
            if (!timeoutRef.current) {
                handleSave();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        if (!id || !data) return;

        setFormData(data.data);
        latestDataRef.current = data.data;
    }, [id, data]);

    useBlocker(true);

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
                            variant="text"
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
                                    ? "Đã Lưu"
                                    : "Đã lưu"}
                        </Button>
                        {/* <Button variant="outlined">Tác vụ khác</Button> */}
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
