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
