export type OptionType = {
    content: string;
    order: number;
    image?: string; // base64 image data
};

export type SlideType = {
    min: number;
    max: number;
    step: number;
    unit: string;
};

export type JumpLogicsType = {
    conditions: {
        questionOrder: number;
        conjunction: string;
        operator: string;
        compareValue: number;
    }[];
    targetQuestionOrder: number;
};
export type QuestionType = {
    image_header?: string;
    questionTypeId: number;
    content: string;
    description: string;
    timeLimit: number;
    isVoice: boolean;
    order: number;
    configJsonString: Record<
        string,
        string | number | SlideType[] | JumpLogicsType[]
    >;
    options: OptionType[];
};

export type SurveyType = {
    id: number;
    requesterId: number;
    title: string;
    description: string;
    marketSurveyVersionStatusId: number;
    surveyTypeId: number;
    surveyTopicId: number;
    surveySpecificTopicId: number;
    surveyStatusId: number;
    securityModeId: number;
    background: string;
    customBackgroundImageUrl?: string | null;
    configJsonString: {
        backgroundGradient1Color: string;
        backgroundGradient2Color: string;
        titleColor: string;
        contentColor: string;
        buttonBackgroundColor: string;
        buttonContentColor: string;
        password: string | null;
        brightness: number;
        isResizableIframeEnabled?: boolean;
    };
    questions: QuestionType[];
    skipStartPage: boolean;
};

export interface PageProps {
    isDisable: boolean;
    formData: SurveyType;
    setFormData: React.Dispatch<React.SetStateAction<SurveyType>>;
    handleTabClick: (tabValue: number) => void;
    isTrigger: boolean;
}
