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
const getQuestionType = (questionTypeId: number, config: any) => {
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

function ModalLogic({
    onClose,
    questionsData,
    handleUpdateQuestion,
    question,
}: {
    question: any;
    onClose: () => void;
    questionsData: any;
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
    const [conditions, setConditions] = useState([
        {
            id: 1,
            questionOrder: "",
            conjunction: null,
            operator: "Chọn",
            optionOrder: "",
            compareValue: "",
        },
    ]);
    const [targetQuestionOrder, setTargetQuestionOrder] = useState("end");

    // Lấy operators phù hợp dựa trên loại câu hỏi
    const getAvailableOperators = (questionOrder: string) => {
        if (!questionOrder) return ["Chọn"];

        const question = questionsData.find(
            (q) => q.order.toString() === questionOrder
        );
        if (!question) return ["Chọn"];

        const questionType = getQuestionType(
            question.questionTypeId,
            question.configJsonString
        );
        const baseOperators = ["Chọn", "Không Chọn"];

        if (questionType === "number" || questionType === "rating") {
            return [...baseOperators, "=", "≠", ">", "≥", "<", "≤"];
        }

        return baseOperators;
    };

    // Lấy options của câu hỏi
    const getQuestionOptions = (questionOrder: string) => {
        if (!questionOrder) return [];

        const question = questionsData.find(
            (q) => q.order.toString() === questionOrder
        );
        if (!question || !question.options) return [];

        return question.options.map((option: any, index: number) => ({
            label: option.content || option.text || `Option ${index + 1}`,
            value: index + 1,
        }));
    };

    // Kiểm tra xem operator có cần input số không
    const isComparisonOperator = (operator: string) => {
        return ["=", "≠", ">", "≥", "<", "≤"].includes(operator);
    };

    // Kiểm tra xem operator có cần chọn option không
    const isOptionOperator = (operator: string) => {
        return ["Chọn", "Không Chọn"].includes(operator);
    };

    const handleAddCondition = () => {
        const newCondition = {
            id: Date.now(),
            questionOrder: "",
            conjunction: "Và",
            operator: "Chọn",
            optionOrder: "",
            compareValue: "",
        };
        setConditions([...conditions, newCondition]);
    };

    const handleDeleteCondition = (id: number) => {
        if (conditions.length > 1) {
            setConditions(
                conditions.filter((condition) => condition.id !== id)
            );
        }
    };

    const handleConditionChange = (id: number, field: string, value: any) => {
        setConditions(
            conditions.map((condition) => {
                if (condition.id !== id) return condition;

                const updatedCondition = { ...condition, [field]: value };

                // Reset dependent fields khi thay đổi question
                if (field === "questionOrder") {
                    updatedCondition.operator = "Chọn";
                    updatedCondition.optionOrder = "";
                    updatedCondition.compareValue = "";
                }

                // Reset dependent fields khi thay đổi operator
                if (field === "operator") {
                    updatedCondition.optionOrder = "";
                    updatedCondition.compareValue = "";
                }

                return updatedCondition;
            })
        );
    };

    // Validation
    const isConditionValid = (condition: any) => {
        if (!condition.questionOrder || condition.operator === "Chọn") {
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
        return (
            conditions.every(isConditionValid) &&
            (targetQuestionOrder === "end" || targetQuestionOrder !== "")
        );
    };

    const handleSave = () => {
        if (!canSave()) return;

        const output = {
            conditions: conditions.map((condition) => {
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
                targetQuestionOrder === "end"
                    ? "end"
                    : parseInt(targetQuestionOrder),
        };

        console.log("check output: ", output);

        onClose();
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                    <h4 style={styles.modalTitle}>
                        DISPLAY LOGICS - ĐIỀU KIỆN HIỆN CÂU HỎI
                    </h4>
                    <button style={styles.closeButton} onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="px-5">
                    <p style={styles.description}>
                        Lưu ý: Nếu không có trả lời nào thỏa điều kiện của bạn,
                        hệ thống sẽ tự động chuyển sang câu hỏi tiếp theo{" "}
                        <strong>2</strong>. Bạn không cần phải đặt điều kiện để
                        nhảy đến câu này.
                    </p>
                </div>
                <div style={styles.conditionContainer}>
                    {conditions.map((condition, index) => (
                        <div key={condition.id} style={styles.conditionRow}>
                            {/* Conjunction */}
                            <div style={styles.operatorContainer}>
                                {index === 0 ? (
                                    <span style={styles.operatorLabel}>
                                        NẾU
                                    </span>
                                ) : (
                                    <select
                                        style={styles.conjunctionDropdown}
                                        value={condition.conjunction || "Và"}
                                        onChange={(e) =>
                                            handleConditionChange(
                                                condition.id,
                                                "conjunction",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="Và">Và</option>
                                        <option value="Hoặc">Hoặc</option>
                                    </select>
                                )}
                            </div>

                            {/* Question Selection */}
                            <select
                                style={styles.dropdown}
                                value={condition.questionOrder}
                                onChange={(e) =>
                                    handleConditionChange(
                                        condition.id,
                                        "questionOrder",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">Chọn câu hỏi</option>
                                {questionsData
                                    ?.filter(
                                        (item) =>
                                            item?.questionTypeId === 1 ||
                                            item?.questionTypeId === 2 ||
                                            item?.questionTypeId === 6
                                    )
                                    ?.map((q) => (
                                        <option key={q.order} value={q.order}>
                                            Câu {q.order}
                                            {q.content
                                                ? `: ${q.content}`
                                                : ` (Question Type ${q.questionTypeId})`}
                                        </option>
                                    ))}
                            </select>

                            {/* Operator Selection */}
                            <select
                                style={styles.dropdown}
                                value={condition.operator}
                                onChange={(e) =>
                                    handleConditionChange(
                                        condition.id,
                                        "operator",
                                        e.target.value
                                    )
                                }
                                disabled={!condition.questionOrder}
                            >
                                {getAvailableOperators(
                                    condition.questionOrder
                                ).map((op) => (
                                    <option key={op} value={op}>
                                        {op}
                                    </option>
                                ))}
                            </select>

                            {/* Option/Value Input */}
                            {isOptionOperator(condition.operator) &&
                                condition.questionOrder && (
                                    <select
                                        style={styles.dropdown}
                                        value={condition.optionOrder}
                                        onChange={(e) =>
                                            handleConditionChange(
                                                condition.id,
                                                "optionOrder",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Chọn tùy chọn</option>
                                        {getQuestionOptions(
                                            condition.questionOrder
                                        ).length > 0 ? (
                                            getQuestionOptions(
                                                condition.questionOrder
                                            ).map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="1">
                                                Default Option
                                            </option>
                                        )}
                                    </select>
                                )}

                            {isComparisonOperator(condition.operator) && (
                                <input
                                    type="number"
                                    style={styles.numberInput}
                                    placeholder="Nhập giá trị"
                                    value={condition.compareValue}
                                    onChange={(e) =>
                                        handleConditionChange(
                                            condition.id,
                                            "compareValue",
                                            e.target.value
                                        )
                                    }
                                />
                            )}

                            {/* Delete Button */}
                            {conditions.length > 1 && (
                                <button
                                    style={styles.deleteButton}
                                    onClick={() =>
                                        handleDeleteCondition(condition.id)
                                    }
                                    title="Xóa điều kiện"
                                >
                                    ×
                                </button>
                            )}

                            {/* Validation Indicator */}
                            <div
                                style={{
                                    ...styles.validationIndicator,
                                    backgroundColor: isConditionValid(condition)
                                        ? "#52c41a"
                                        : "#ff4d4f",
                                }}
                            />
                        </div>
                    ))}

                    <div style={styles.addLogicContainer}>
                        <button
                            style={styles.addConditionButton}
                            onClick={handleAddCondition}
                        >
                            + Thêm điều kiện
                        </button>
                    </div>
                </div>

                <div style={styles.jumpToContainer}>
                    <div style={styles.jumpToRow}>
                        <span style={styles.jumpToLabel}>THÌ</span>
                        <div style={styles.jumpToActionContainer}>
                            <button style={styles.jumpToButton}>Hiện</button>
                            <select
                                style={styles.targetDropdown}
                                value={targetQuestionOrder}
                                onChange={(e) =>
                                    setTargetQuestionOrder(e.target.value)
                                }
                            >
                                <option value="end">Kết thúc</option>
                                {questionsData.map((q) => (
                                    <option key={q.order} value={q.order}>
                                        Câu {q.order}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div style={styles.actionContainer}>
                    <button
                        style={{
                            ...styles.saveButton,
                            opacity: canSave() ? 1 : 0.5,
                            cursor: canSave() ? "pointer" : "not-allowed",
                        }}
                        onClick={handleSave}
                        disabled={!canSave()}
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
