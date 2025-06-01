export type SurveyQuestionType = {
    id: number;
    name: string;
};

export const SurveyQuestionType: SurveyQuestionType[] = [
    { id: 1, name: "Single Choice" }, // Chọn 1 đáp án
    { id: 2, name: "Multiple Choice" }, // Chọn nhiều đáp án
    { id: 3, name: "Single Slider" }, // Slider đơn (1 toggle)
    { id: 4, name: "Range Slider" }, // Slider khoảng (2 toggle)
    { id: 5, name: "Single input by types" }, // Nhập liệu theo kiểu
    { id: 6, name: "Rating" }, // Đánh giá sao
    { id: 7, name: "Ranking" }, // Xếp hạng
];

export const answerDefault = { content: "", order: 0 };

export const SurveyFieldInputType = [
    { id: 1, name: "Kiểu câu ngắn không xuống dòng" },
    { id: 2, name: "Kiểu văn bản dài có xuống dòng" },
    { id: 3, name: "Kiểu email" },
    { id: 4, name: "Kiểu số" },
    { id: 5, name: "Kiểu ngày tháng năm (DD/MM/YYYY)" },
    { id: 6, name: "Kiểu ngày tháng (DD/MM)" },
    { id: 7, name: "Kiểu năm (4 số)" },
    { id: 8, name: "Kiểu giờ phút (HH:MM)" },
    { id: 9, name: "Kiểu ngày tháng năm giờ phút (DD/MM/YYYY HH:MM)" },
];
