/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { OptionType, QuestionType } from "../../../../types/survey";
import type { RangeSliderConfigJsonStringType } from "../../RangeSlider/RangeSlider";

export default function LogicComponent({
    questions,
    handleUpdateQuestion,
    question,
}: {
    questions: QuestionType[];
    question: any;
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
                    <h3 style={styles.title}>KHẢO SÁT RẼ NHÁNH</h3>
                    <button
                        style={styles.closeButton}
                        onClick={handleCloseModal}
                    >
                        ×
                    </button>
                </div>
                <p style={styles.description}>
                    Lưu ý: Nếu không có trả lời nào thỏa điều kiện của bạn, hệ
                    thống sẽ tự động chuyển sang câu hỏi tiếp theo{" "}
                    <strong>2</strong>. Bạn không cần phải đặt điều kiện để nhảy
                    đến câu này.
                </p>
                <button style={styles.addButton} onClick={handleOpenModal}>
                    Thêm logic
                </button>
            </div>

            {isModalOpen && (
                <ModalLogic
                    questions={questions}
                    onClose={handleCloseModal}
                    handleUpdateQuestion={handleUpdateQuestion}
                    question={question}
                />
            )}
        </>
    );
}
function ModalLogic({
    onClose,
    questions,
    handleUpdateQuestion,
    question,
}: {
    onClose: () => void;
    questions: QuestionType[];
    question: any;
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
    const [targetQuestionOrder, setTargetQuestionOrder] = useState("");

    const getOperatorsForQuestion = (questionOrder: string) => {
        const question = questions.find(
            (q) => q.order.toString() === questionOrder
        );
        if (!question) return [];

        const baseOperators = ["Chọn", "Không Chọn"];

        if (question.questionTypeId === 2 || question.questionTypeId === 3) {
            return [...baseOperators, "=", "≠", ">", "≥", "<", "≤"];
        }

        return baseOperators;
    };

    const handleAddCondition = () => {
        const newCondition = {
            id: conditions.length + 1,
            questionOrder: "",
            conjunction: conditions.length > 0 ? "Và" : null,
            operator: "Chọn",
            optionOrder: "",
            compareValue: "",
        };
        setConditions([...conditions, newCondition]);
    };

    const handleDeleteCondition = (id: any) => {
        const updatedConditions = conditions.filter(
            (condition) => condition.id !== id
        );
        // Reset conjunction for first condition
        if (updatedConditions.length > 0) {
            updatedConditions[0].conjunction = null;
        }
        setConditions(updatedConditions);
    };

    const handleConditionChange = (id: any, field: any, value: any) => {
        setConditions(
            conditions.map((condition, index) =>
                condition.id === id
                    ? {
                          ...condition,
                          [field]: value,
                          // Reset dependent fields when question changes
                          ...(field === "questionOrder" && {
                              operator: "Chọn",
                              optionOrder: "",
                              compareValue: "",
                          }),
                          // Set conjunction to null for first condition
                          conjunction:
                              index === 0 ? null : condition.conjunction,
                      }
                    : condition
            )
        );
    };

    const handleSaveLogic = () => {
        const isValid = conditions.every((condition) => {
            if (!condition.questionOrder || !condition.operator) {
                return false;
            }

            if (["Chọn", "Không Chọn"].includes(condition.operator)) {
                return condition.optionOrder !== "";
            }

            if (["=", "≠", ">", "≥", "<", "≤"].includes(condition.operator)) {
                return (
                    condition.compareValue !== "" &&
                    !isNaN(Number(condition.compareValue))
                );
            }

            return true;
        });

        if (!isValid) {
            alert("Vui lòng điền đầy đủ thông tin cho tất cả điều kiện");
            return;
        }

        if (!targetQuestionOrder) {
            alert("Vui lòng chọn câu hỏi đích");
            return;
        }

        const logicData = {
            conditions: conditions.map((condition) => ({
                questionOrder: parseInt(condition.questionOrder),
                conjunction: condition.conjunction,
                operator: condition.operator,
                ...(["Chọn", "Không Chọn"].includes(condition.operator) && {
                    optionOrder: parseInt(condition.optionOrder),
                }),
                ...(["=", "≠", ">", "≥", "<", "≤"].includes(
                    condition.operator
                ) && {
                    compareValue: parseInt(condition.compareValue),
                }),
            })),
            targetQuestionOrder:
                targetQuestionOrder === "end"
                    ? "end"
                    : parseInt(targetQuestionOrder),
        };

        handleUpdateQuestion("configJsonString", {
            ...question.configJsonString,
            jumpLogics: [logicData],
        });
        onClose();
    };

    const getOptionsForQuestion = (questionOrder: string) => {
        const question = questions.find(
            (q) => q.order.toString() === questionOrder
        );
        if (!question || !question.options) return [];

        return question.options.map((option, index) => ({
            value: (index + 1).toString(),
            label:
                (option as any).text ||
                option.content ||
                `Tùy chọn ${index + 1}`,
        }));
    };

    const isComparisonOperator = (operator: string) => {
        return ["=", "≠", ">", "≥", "<", "≤"].includes(operator);
    };

    const isOptionOperator = (operator: string) => {
        return ["Chọn", "Không Chọn"].includes(operator);
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                    <h4 style={styles.modalTitle}>Cài đặt Logic</h4>
                    <button style={styles.closeButton} onClick={onClose}>
                        ×
                    </button>
                </div>

                <div style={styles.conditionContainer}>
                    <h5 style={styles.sectionTitle}>Điều kiện</h5>

                    {conditions.map((condition, index) => {
                        const selectedQuestion = questions.find(
                            (q) =>
                                q.order.toString() === condition.questionOrder
                        );
                        const availableOptions = getOptionsForQuestion(
                            condition.questionOrder
                        );
                        const availableOperators = getOperatorsForQuestion(
                            condition.questionOrder
                        );

                        return (
                            <div key={condition.id} style={styles.conditionRow}>
                                {/* Conjunction */}
                                {index > 0 && (
                                    <select
                                        style={{
                                            ...styles.dropdown,
                                            minWidth: "80px",
                                        }}
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
                                {index === 0 && (
                                    <span
                                        style={{
                                            ...styles.label,
                                            minWidth: "80px",
                                        }}
                                    >
                                        NẾU
                                    </span>
                                )}

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
                                    <option value="">CHỌN CÂU HỎI</option>
                                    {questions.map((question) => (
                                        <option
                                            key={question.order}
                                            value={question.order.toString()}
                                        >
                                            Câu hỏi {question.order}
                                            {question.content &&
                                                ` - ${question.content.substring(
                                                    0,
                                                    30
                                                )}${
                                                    question.content.length > 30
                                                        ? "..."
                                                        : ""
                                                }`}
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
                                    {availableOperators.map((op) => (
                                        <option key={op} value={op}>
                                            {op}
                                        </option>
                                    ))}
                                </select>

                                {/* Option/Value Selection */}
                                {isOptionOperator(condition.operator) ? (
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
                                        disabled={!condition.questionOrder}
                                    >
                                        <option value="">CHỌN ĐÁP ÁN</option>
                                        {availableOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                        {availableOptions.length === 0 &&
                                            condition.questionOrder && (
                                                <option value="1">
                                                    Bất kỳ tùy chọn nào
                                                </option>
                                            )}
                                    </select>
                                ) : isComparisonOperator(condition.operator) ? (
                                    <input
                                        type="number"
                                        style={{
                                            ...styles.dropdown,
                                            minWidth: "100px",
                                        }}
                                        value={condition.compareValue}
                                        onChange={(e) =>
                                            handleConditionChange(
                                                condition.id,
                                                "compareValue",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Giá trị"
                                        disabled={!condition.questionOrder}
                                    />
                                ) : null}

                                {/* Delete Button */}
                                {conditions.length > 1 && (
                                    <button
                                        style={styles.deleteButton}
                                        onClick={() =>
                                            handleDeleteCondition(condition.id)
                                        }
                                        title="Xóa điều kiện"
                                    >
                                        🗑️
                                    </button>
                                )}
                            </div>
                        );
                    })}

                    <button
                        style={styles.addConditionButton}
                        onClick={handleAddCondition}
                    >
                        + Thêm điều kiện
                    </button>
                </div>

                <div style={styles.jumpToContainer}>
                    <div style={styles.jumpToHeader}>
                        <span style={styles.label}>Nhảy tới</span>
                        <select
                            style={styles.jumpToDropdown}
                            value={targetQuestionOrder}
                            onChange={(e) =>
                                setTargetQuestionOrder(e.target.value)
                            }
                        >
                            <option value="">Chọn câu hỏi đích</option>
                            {questions.map((question) => (
                                <option
                                    key={question.order}
                                    value={question.order.toString()}
                                >
                                    Câu hỏi {question.order}
                                    {question.content &&
                                        ` - ${question.content.substring(
                                            0,
                                            50
                                        )}${
                                            question.content.length > 50
                                                ? "..."
                                                : ""
                                        }`}
                                </option>
                            ))}
                            <option value="end">Kết thúc khảo sát</option>
                        </select>
                    </div>
                    <div style={styles.jumpToBar}></div>
                </div>

                <div style={styles.modalActions}>
                    <button style={styles.cancelButton} onClick={onClose}>
                        Hủy
                    </button>
                    <button style={styles.saveButton} onClick={handleSaveLogic}>
                        Lưu logic
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
        position: "fixed",
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
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "0",
        maxWidth: "800px",
        width: "90%",
        maxHeight: "80vh",
        overflow: "auto",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    },
    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderBottom: "1px solid #eee",
    },
    modalTitle: {
        margin: 0,
        fontSize: "18px",
        color: "#333",
        fontWeight: "bold",
    },
    sectionTitle: {
        margin: "0 0 15px 0",
        fontSize: "16px",
        color: "#333",
        fontWeight: "600",
    },
    conditionContainer: {
        padding: "20px",
        borderBottom: "1px solid #eee",
    },
    conditionRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "15px",
        padding: "12px",
        backgroundColor: "#f8f9fa",
        borderRadius: "6px",
        border: "1px solid #e9ecef",
        flexWrap: "wrap",
    },
    label: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#333",
        minWidth: "40px",
    },
    dropdown: {
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #ddd",
        fontSize: "14px",
        backgroundColor: "#fff",
        minWidth: "150px",
        flex: 1,
    },
    deleteButton: {
        backgroundColor: "#ff4d4f",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "14px",
        flexShrink: 0,
    },
    addConditionButton: {
        background: "none",
        border: "2px dashed #1890ff",
        color: "#1890ff",
        cursor: "pointer",
        fontSize: "14px",
        padding: "10px",
        borderRadius: "6px",
        width: "100%",
        fontWeight: "500",
    },
    jumpToContainer: {
        padding: "20px",
        backgroundColor: "#f8f9fa",
    },
    jumpToHeader: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "15px",
    },
    jumpToDropdown: {
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #ddd",
        fontSize: "14px",
        backgroundColor: "#fff",
        minWidth: "200px",
    },
    jumpToBar: {
        backgroundColor: "#52c41a",
        height: "8px",
        borderRadius: "4px",
        marginTop: "10px",
    },
    modalActions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px",
        padding: "20px",
        borderTop: "1px solid #eee",
    },
    cancelButton: {
        backgroundColor: "#fff",
        color: "#666",
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "14px",
    },
    saveButton: {
        backgroundColor: "#52c41a",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
    },
};
