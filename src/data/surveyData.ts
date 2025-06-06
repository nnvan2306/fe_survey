export const SurveyTopic = [
    { "id": 1, "name": "Ẩm thực" },
    { "id": 2, "name": "Giáo dục" },
    { "id": 3, "name": "Sức khỏe & Thể dục" },
    { "id": 4, "name": "Công nghệ" },
    { "id": 5, "name": "Tài chính cá nhân" },
    { "id": 6, "name": "Mua sắm & Thương mại" },
    { "id": 7, "name": "Du lịch & Giải trí" },
    { "id": 8, "name": "Xã hội & Hành vi" },
    { "id": 9, "name": "Môi trường" },
    { "id": 10, "name": "Chính trị & Pháp luật" }
];

export const SurveySpecificTopic = [
    { "id": 1, "name": "Món ăn yêu thích", "surveyTopicId": 1 },
    { "id": 2, "name": "Thói quen ăn uống", "surveyTopicId": 1 },
    { "id": 3, "name": "Chế độ ăn kiêng", "surveyTopicId": 1 },
    { "id": 4, "name": "Chất lượng giáo dục", "surveyTopicId": 2 },
    { "id": 5, "name": "Học trực tuyến", "surveyTopicId": 2 },
    { "id": 6, "name": "Hành vi học tập", "surveyTopicId": 2 },
    { "id": 7, "name": "Thói quen tập luyện", "surveyTopicId": 3 },
    { "id": 8, "name": "Sức khỏe tinh thần", "surveyTopicId": 3 },
    { "id": 9, "name": "Chế độ sinh hoạt", "surveyTopicId": 3 },
    { "id": 10, "name": "Thiết bị thông minh", "surveyTopicId": 4 },
    { "id": 11, "name": "Ứng dụng di động", "surveyTopicId": 4 },
    { "id": 12, "name": "Trí tuệ nhân tạo", "surveyTopicId": 4 },
    { "id": 13, "name": "Chi tiêu cá nhân", "surveyTopicId": 5 },
    { "id": 14, "name": "Đầu tư nhỏ lẻ", "surveyTopicId": 5 },
    { "id": 15, "name": "Quản lý nợ", "surveyTopicId": 5 },
    { "id": 16, "name": "Trải nghiệm mua sắm online", "surveyTopicId": 6 },
    { "id": 17, "name": "Thói quen tiêu dùng", "surveyTopicId": 6 },
    { "id": 18, "name": "So sánh giá cả", "surveyTopicId": 6 },
    { "id": 19, "name": "Kế hoạch du lịch", "surveyTopicId": 7 },
    { "id": 20, "name": "Phương tiện di chuyển", "surveyTopicId": 7 },
    { "id": 21, "name": "Địa điểm yêu thích", "surveyTopicId": 7 },
    { "id": 22, "name": "Mạng xã hội", "surveyTopicId": 8 },
    { "id": 23, "name": "Thói quen sử dụng điện thoại", "surveyTopicId": 8 },
    { "id": 24, "name": "Tâm lý người tiêu dùng", "surveyTopicId": 8 },
    { "id": 25, "name": "Bảo vệ môi trường", "surveyTopicId": 9 },
    { "id": 26, "name": "Tái chế và rác thải", "surveyTopicId": 9 },
    { "id": 27, "name": "Biến đổi khí hậu", "surveyTopicId": 9 },
    { "id": 28, "name": "Nhận thức chính trị", "surveyTopicId": 10 },
    { "id": 29, "name": "Tham gia bầu cử", "surveyTopicId": 10 },
    { "id": 30, "name": "Luật pháp và quyền công dân", "surveyTopicId": 10 }
];

export const SurveySecurityMode = [
    {
        id: 1,
        name: "Basic",
        description: "6 loại câu hỏi để bạn tha hồ tùy chỉnh khảo sát. Random captcha giữa những câu hỏi. Random Re-question câu hỏi bất kỳ cho bài khảo sát. Random Time-limit cho câu hỏi"
    },
    {
        id: 2,
        name: "Advance",
        description: "6 loại câu hỏi để bạn tha hồ tùy chỉnh khảo sát. Random captcha giữa những câu hỏi. Random Re-question câu hỏi bất kỳ cho bài khảo sát. Chủ động điều chỉnh Time-limit cho từng câu hỏi. Cơ chế Jump Logic giúp khảo sát được liền mạch và chắt lọc thông tin hơn."
    },
    {
        id: 3,
        name: "Pro",
        description: "6 loại câu hỏi để bạn tha hồ tùy chỉnh khảo sát. Random captcha giữa những câu hỏi. Random Re-question câu hỏi bất kỳ cho bài khảo sát. Chủ động điều chỉnh Time-limit cho từng câu hỏi. Cơ chế Jump Logic giúp khảo sát được liền mạch và chắt lọc thông tin hơn. Tính năng set voice-answer cho câu hỏi"
    }
];