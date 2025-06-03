export type OptionType = {
    content: string;
    order: number;
};

export type SlideType = {
    min: number;
    max: number;
    step: number;
    unit: string;
};
export type QuestionType = {
    questionTypeId: number;
    content: string;
    description: string;
    timeLimit: number;
    isVoiced: boolean;
    order: number;
    configJsonString: Record<string, string | number | SlideType[]>;
    options: OptionType[];
};

export type SurveyType = {
    id: number;
    requesterId: number;
    title: string;
    description: string;
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
        password: string;
        brightness: number;
    };
    questions: QuestionType[];
    skipStartPage: boolean;
};

export interface PageProps {
    formData: SurveyType;
    setFormData: React.Dispatch<React.SetStateAction<SurveyType>>;
}
