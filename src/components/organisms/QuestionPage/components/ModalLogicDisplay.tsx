/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { OptionType, QuestionType } from "../../../../types/survey";
import type { RangeSliderConfigJsonStringType } from "../../RangeSlider/RangeSlider";

export default function LogicComponentDisplay({
    handleUpdateQuestion,
    question,
    questions,
}: {
    question: any;
    questions: QuestionType[];
    handleUpdateQuestion: (
        key: keyof QuestionType,
        value:
            | string
            | number
            | boolean
            | OptionType[]
            | Record<string, string | number>
            | RangeSliderConfigJsonStringType
            | Record<string, unknown>
    ) => void;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div style={styles.modalContainer}>
                <div style={styles.header}>
                    <h3 style={styles.title}>
                        Display Logic - Điều kiện hiện câu hỏi này
                    </h3>
                    <button
                        style={styles.closeButton}
                        onClick={handleCloseModal}
                    >
                        ×
                    </button>
                </div>
                <button style={styles.addButton} onClick={handleOpenModal}>
                    Thêm logic
                </button>
            </div>

            {isModalOpen && (
                <ModalLogic
                    onClose={handleCloseModal}
                    handleUpdateQuestion={handleUpdateQuestion}
                    questionsData={questions}
                    question={question}
                />
            )}
        </>
    );
}

// Mapping questionTypeId to question types
const getQuestionType = (questionTypeId: number) => {
    switch (questionTypeId) {
        case 0: // Text/Input
            return "text";
        case 1: // Single Choice
            return "single_choice";
        case 2: // Multiple Choice
            return "multiple_choice";
        case 3: // Rating/Scale
            return "rating";
        case 4: // Number
            return "number";
        case 5: // Date
            return "date";
        default:
            return "text";
    }
};

type DisplayLogicType = {
    conditions: {
        id: number;
        questionOrder: string;
        conjunction: string | null;
        operator: string;
        optionOrder: string;
        compareValue: string;
    }[];
    targetQuestionOrder: string;
};

function ModalLogic({
    onClose,
    questionsData,
    handleUpdateQuestion,
    question,
}: {
    question: any;
    onClose: () => void;
    questionsData: QuestionType[];
    handleUpdateQuestion: (
        key: keyof QuestionType,
        value:
            | string
            | number
            | boolean
            | OptionType[]
            | Record<string, string | number>
            | RangeSliderConfigJsonStringType
            | Record<string, unknown>
    ) => void;
}) {
    const [displayLogics, setDisplayLogics] = useState<DisplayLogicType[]>([
        {
            conditions: [
                {
                    id: 1,
                    questionOrder: "",
                    conjunction: null,
                    operator: "Chọn",
                    optionOrder: "",
                    compareValue: "",
                },
            ],
            targetQuestionOrder: "end",
        },
    ]);

    const getAvailableOperators = (questionOrder: string) => {
        if (!questionOrder) return ["Chọn"];

        const question = questionsData.find(
            (q: QuestionType) => q.order.toString() === questionOrder
        );
        if (!question) return ["Chọn"];

        const questionType = getQuestionType(question.questionTypeId);
        const baseOperators = ["Chọn", "Không Chọn"];

        if (questionType === "number" || questionType === "rating") {
            return [...baseOperators, "=", "≠", ">", "≥", "<", "≤"];
        }

        return baseOperators;
    };

    const getQuestionOptions = (questionOrder: string) => {
        if (!questionOrder) return [];

        const question = questionsData.find(
            (q: QuestionType) => q.order.toString() === questionOrder
        );
        if (!question || !question.options) return [];

        return question.options.map((option: OptionType, index: number) => ({
            label: option.content || `Option ${index + 1}`,
            value: (index + 1).toString(),
        }));
    };

    const isComparisonOperator = (operator: string) => {
        return ["=", "≠", ">", "≥", "<", "≤"].includes(operator);
    };

    const isOptionOperator = (operator: string) => {
        return ["Chọn", "Không Chọn"].includes(operator);
    };

    const handleAddLogic = () => {
        const newLogic: DisplayLogicType = {
            conditions: [
                {
                    id: Date.now(),
                    questionOrder: "",
                    conjunction: null,
                    operator: "Chọn",
                    optionOrder: "",
                    compareValue: "",
                },
            ],
            targetQuestionOrder: "end",
        };
        setDisplayLogics([...displayLogics, newLogic]);
    };

    const handleDeleteLogic = (logicIndex: number) => {
        if (displayLogics.length > 1) {
            setDisplayLogics(
                displayLogics.filter((_, index) => index !== logicIndex)
            );
        }
    };

    const handleAddCondition = (logicIndex: number) => {
        const logic = displayLogics[logicIndex];
        const newCondition = {
            id: Date.now(),
            questionOrder: "",
            conjunction: "Và",
            operator: "Chọn",
            optionOrder: "",
            compareValue: "",
        };
        const newLogics = [...displayLogics];
        newLogics[logicIndex] = {
            ...logic,
            conditions: [...logic.conditions, newCondition],
        };
        setDisplayLogics(newLogics);
    };

    const handleDeleteCondition = (logicIndex: number, conditionId: number) => {
        const logic = displayLogics[logicIndex];
        if (logic.conditions.length > 1) {
            const newLogics = [...displayLogics];
            newLogics[logicIndex] = {
                ...logic,
                conditions: logic.conditions.filter(
                    (condition) => condition.id !== conditionId
                ),
            };
            setDisplayLogics(newLogics);
        }
    };

    const handleConditionChange = (
        logicIndex: number,
        conditionId: number,
        field: string,
        value: string
    ) => {
        const logic = displayLogics[logicIndex];
        const newLogics = [...displayLogics];
        newLogics[logicIndex] = {
            ...logic,
            conditions: logic.conditions.map((condition) => {
                if (condition.id !== conditionId) return condition;

                const updatedCondition = { ...condition, [field]: value };

                if (field === "questionOrder") {
                    updatedCondition.operator = "Chọn";
                    updatedCondition.optionOrder = "";
                    updatedCondition.compareValue = "";
                }

                if (field === "operator") {
                    updatedCondition.optionOrder = "";
                    updatedCondition.compareValue = "";
                }

                return updatedCondition;
            }),
        };
        setDisplayLogics(newLogics);
    };

    const handleTargetQuestionChange = (logicIndex: number, value: string) => {
        const newLogics = [...displayLogics];
        newLogics[logicIndex] = {
            ...newLogics[logicIndex],
            targetQuestionOrder: value,
        };
        setDisplayLogics(newLogics);
    };

    const isConditionValid = (condition: any) => {
        if (!condition.questionOrder || !condition.operator) {
            return false;
        }

        if (isOptionOperator(condition.operator)) {
            return condition.optionOrder !== "";
        }

        if (isComparisonOperator(condition.operator)) {
            return (
                condition.compareValue !== "" &&
                !isNaN(Number(condition.compareValue))
            );
        }

        return true;
    };

    const canSave = () => {
        return displayLogics.every(
            (logic) =>
                logic.conditions.every(isConditionValid) &&
                (logic.targetQuestionOrder === "end" ||
                    logic.targetQuestionOrder !== "")
        );
    };

    const handleSave = () => {
        if (!canSave()) return;

        const output = {
            displayLogics: displayLogics.map((logic) => ({
                conditions: logic.conditions.map((condition) => {
                    const baseCondition = {
                        questionOrder: parseInt(condition.questionOrder),
                        conjunction: condition.conjunction,
                        operator: condition.operator,
                    };

                    if (isOptionOperator(condition.operator)) {
                        return {
                            ...baseCondition,
                            optionOrder: parseInt(condition.optionOrder),
                        };
                    }

                    if (isComparisonOperator(condition.operator)) {
                        return {
                            ...baseCondition,
                            compareValue: parseInt(condition.compareValue),
                        };
                    }

                    return baseCondition;
                }),
                targetQuestionOrder:
                    logic.targetQuestionOrder === "end"
                        ? "end"
                        : parseInt(logic.targetQuestionOrder),
            })),
        };

        handleUpdateQuestion("configJsonString", {
            ...question.configJsonString,
            ...output,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-[90%] max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Display Logic - Điều kiện hiện câu hỏi
                    </h2>
                    <p className="text-sm text-gray-600">
                        Lưu ý: Nếu không có trả lời nào thỏa điều kiện của bạn,
                        hệ thống sẽ tự động chuyển sang câu hỏi tiếp theo. Bạn
                        không cần phải đặt điều kiện để nhảy đến câu này.
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {displayLogics.map((logic, logicIndex) => (
                        <div
                            key={logicIndex}
                            className="mb-6 bg-white border border-gray-200 rounded-lg p-4"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Logic {logicIndex + 1}
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            handleAddCondition(logicIndex)
                                        }
                                        className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        + Thêm điều kiện
                                    </button>
                                    {displayLogics.length > 1 && (
                                        <button
                                            onClick={() =>
                                                handleDeleteLogic(logicIndex)
                                            }
                                            className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            Xóa logic
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {logic.conditions.map(
                                    (condition, conditionIndex) => (
                                        <div
                                            key={condition.id}
                                            className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                                        >
                                            {conditionIndex === 0 ? (
                                                <span className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded font-medium">
                                                    NẾU
                                                </span>
                                            ) : (
                                                <select
                                                    value={
                                                        condition.conjunction ||
                                                        "Và"
                                                    }
                                                    onChange={(e) =>
                                                        handleConditionChange(
                                                            logicIndex,
                                                            condition.id,
                                                            "conjunction",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-20 px-2 py-1.5 border border-gray-300 rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                >
                                                    <option value="Và">
                                                        Và
                                                    </option>
                                                    <option value="Hoặc">
                                                        Hoặc
                                                    </option>
                                                </select>
                                            )}

                                            <select
                                                value={condition.questionOrder}
                                                onChange={(e) =>
                                                    handleConditionChange(
                                                        logicIndex,
                                                        condition.id,
                                                        "questionOrder",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-1 px-2 py-1.5 border border-gray-300 rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            >
                                                <option value="">
                                                    Chọn câu hỏi
                                                </option>
                                                {questionsData
                                                    .filter((q: QuestionType) =>
                                                        [1, 2, 6].includes(
                                                            q.questionTypeId
                                                        )
                                                    )
                                                    .map((q: QuestionType) => (
                                                        <option
                                                            key={q.order}
                                                            value={q.order}
                                                        >
                                                            Câu {q.order}
                                                            {q.content
                                                                ? `: ${q.content.substring(
                                                                      0,
                                                                      50
                                                                  )}${
                                                                      q.content
                                                                          .length >
                                                                      50
                                                                          ? "..."
                                                                          : ""
                                                                  }`
                                                                : ` (Question Type ${q.questionTypeId})`}
                                                        </option>
                                                    ))}
                                            </select>

                                            <select
                                                value={condition.operator}
                                                onChange={(e) =>
                                                    handleConditionChange(
                                                        logicIndex,
                                                        condition.id,
                                                        "operator",
                                                        e.target.value
                                                    )
                                                }
                                                disabled={
                                                    !condition.questionOrder
                                                }
                                                className="w-40 px-2 py-1.5 border border-gray-300 rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            >
                                                {getAvailableOperators(
                                                    condition.questionOrder
                                                ).map((op) => (
                                                    <option key={op} value={op}>
                                                        {op}
                                                    </option>
                                                ))}
                                            </select>

                                            {isOptionOperator(
                                                condition.operator
                                            ) &&
                                                condition.questionOrder && (
                                                    <select
                                                        value={
                                                            condition.optionOrder
                                                        }
                                                        onChange={(e) =>
                                                            handleConditionChange(
                                                                logicIndex,
                                                                condition.id,
                                                                "optionOrder",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-40 px-2 py-1.5 border border-gray-300 rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                    >
                                                        <option value="">
                                                            Chọn tùy chọn
                                                        </option>
                                                        {getQuestionOptions(
                                                            condition.questionOrder
                                                        ).map((option) => (
                                                            <option
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}

                                            {isComparisonOperator(
                                                condition.operator
                                            ) && (
                                                <input
                                                    type="number"
                                                    value={
                                                        condition.compareValue
                                                    }
                                                    onChange={(e) =>
                                                        handleConditionChange(
                                                            logicIndex,
                                                            condition.id,
                                                            "compareValue",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Nhập giá trị"
                                                    className="w-32 px-2 py-1.5 border border-gray-300 rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                />
                                            )}

                                            {logic.conditions.length > 1 && (
                                                <button
                                                    onClick={() =>
                                                        handleDeleteCondition(
                                                            logicIndex,
                                                            condition.id
                                                        )
                                                    }
                                                    className="p-1.5 text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            )}

                                            <div
                                                className={`w-2 h-2 rounded-full ${
                                                    isConditionValid(condition)
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            />
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-gray-700 whitespace-nowrap">
                                        THÌ
                                    </span>
                                    <button className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                        Hiện
                                    </button>
                                    <select
                                        value={logic.targetQuestionOrder}
                                        onChange={(e) =>
                                            handleTargetQuestionChange(
                                                logicIndex,
                                                e.target.value
                                            )
                                        }
                                        className="flex-1 px-2 py-1.5 border border-gray-300 rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="end">Kết thúc</option>
                                        {questionsData.map(
                                            (q: QuestionType) => (
                                                <option
                                                    key={q.order}
                                                    value={q.order}
                                                >
                                                    Câu {q.order}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleAddLogic}
                        className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        + Thêm logic mới
                    </button>
                </div>

                <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!canSave()}
                        className={`px-4 py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            canSave()
                                ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Lưu Logic
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    modalContainer: {
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "600px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        borderBottom: "1px solid #eee",
        paddingBottom: "10px",
    },
    title: {
        margin: 0,
        fontSize: "18px",
        color: "#333",
        fontWeight: "bold",
    },
    closeButton: {
        background: "none",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
        color: "#999",
        padding: "0",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    description: {
        backgroundColor: "#f8f9fa",
        padding: "15px",
        borderRadius: "6px",
        fontSize: "14px",
        color: "#666",
        marginBottom: "20px",
        lineHeight: "1.5",
        border: "1px solid #e9ecef",
    },
    addButton: {
        backgroundColor: "#1890ff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        width: "100%",
        transition: "background-color 0.3s",
    },
    modalOverlay: {
        position: "fixed" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        padding: "0",
        maxWidth: "800px",
        width: "90%",
        maxHeight: "85vh",
        overflow: "auto",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    },
    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 24px",
        borderBottom: "1px solid #e9ecef",
        backgroundColor: "#fff",
        borderRadius: "12px 12px 0 0",
    },
    modalTitle: {
        margin: 0,
        fontSize: "16px",
        color: "#495057",
        fontWeight: "600",
    },
    conditionContainer: {
        padding: "24px",
    },
    conditionRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "16px",
        padding: "16px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        position: "relative" as const,
    },
    operatorContainer: {
        minWidth: "80px",
        display: "flex",
        alignItems: "center",
    },
    operatorLabel: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#495057",
        padding: "8px 12px",
        backgroundColor: "#e9ecef",
        borderRadius: "6px",
    },
    conjunctionDropdown: {
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #ced4da",
        fontSize: "14px",
        backgroundColor: "#fff",
        color: "#495057",
        fontWeight: "500",
        minWidth: "70px",
        cursor: "pointer",
    },
    dropdown: {
        padding: "10px 12px",
        borderRadius: "6px",
        border: "1px solid #ced4da",
        fontSize: "14px",
        backgroundColor: "#fff",
        color: "#495057",
        flex: 1,
        minWidth: "140px",
        cursor: "pointer",
        transition: "border-color 0.2s",
    },
    numberInput: {
        padding: "10px 12px",
        borderRadius: "6px",
        border: "1px solid #ced4da",
        fontSize: "14px",
        backgroundColor: "#fff",
        color: "#495057",
        width: "120px",
        textAlign: "center" as const,
    },
    deleteButton: {
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold",
        transition: "background-color 0.2s",
        flexShrink: 0,
    },
    validationIndicator: {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        position: "absolute" as const,
        top: "8px",
        right: "8px",
    },
    addLogicContainer: {
        display: "flex",
        justifyContent: "center",
        margin: "20px 0",
    },
    addConditionButton: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
    },
    jumpToContainer: {
        padding: "24px",
        borderTop: "1px solid #dee2e6",
        backgroundColor: "#fff",
    },
    jumpToRow: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    jumpToLabel: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#495057",
        minWidth: "40px",
    },
    jumpToActionContainer: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    jumpToButton: {
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "8px 16px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
    },
    targetDropdown: {
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #ced4da",
        fontSize: "14px",
        backgroundColor: "#fff",
        color: "#495057",
        minWidth: "120px",
        cursor: "pointer",
    },
    actionContainer: {
        padding: "24px",
        borderTop: "1px solid #dee2e6",
        backgroundColor: "#fff",
        borderRadius: "0 0 12px 12px",
    },
    saveButton: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "600",
        width: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
    },
};
