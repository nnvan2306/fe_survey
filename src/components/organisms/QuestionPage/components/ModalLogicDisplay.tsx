/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export default function LogicComponentDisplay() {
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
                    <h3 style={styles.title}>Display Logic - Điều kiện hiện câu hỏi này</h3>
                    <button style={styles.closeButton} onClick={handleCloseModal}>×</button>
                </div>
                <p style={styles.description}>
                    Lưu ý: Nếu không có trả lời nào thỏa điều kiện của bạn, hệ thống sẽ tự động chuyển sang câu hỏi tiếp theo <strong>2</strong>. Bạn không cần phải đặt điều kiện để nhảy đến câu này.
                </p>
                <button style={styles.addButton} onClick={handleOpenModal}>
                    Thêm logic
                </button>
            </div>

            {isModalOpen && <ModalLogic onClose={handleCloseModal} />}
        </>
    );
}

function ModalLogic({ onClose }: { onClose: () => void }) {
    const [conditions, setConditions] = useState([
        { id: 1, question: '', answer: '', operator: 'AND' }
    ]);
    const [jumpToQuestion, setJumpToQuestion] = useState('2');

    const handleAddCondition = () => {
        const newCondition = {
            id: conditions.length + 1,
            question: '',
            answer: '',
            operator: 'OR'
        };
        setConditions([...conditions, newCondition]);
    };

    const handleDeleteCondition = (id: any) => {
        setConditions(conditions.filter(condition => condition.id !== id));
    };

    const handleConditionChange = (id: any, field: any, value: any) => {
        setConditions(conditions.map(condition =>
            condition.id === id ? { ...condition, [field]: value } : condition
        ));
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                    <h4 style={styles.modalTitle}>DISPLAY LOGICS - ĐIỀU KIỆN HIỆN CÂU HỎI</h4>
                    <button style={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div style={styles.conditionContainer}>
                    {conditions.map((condition, index) => (
                        <div key={condition.id}>
                            <div style={styles.conditionRow}>
                                <div style={styles.operatorContainer}>
                                    <span style={styles.operatorLabel}>
                                        {index === 0 ? 'NẾU' : condition.operator}
                                    </span>
                                    {index > 0 && (
                                        <select
                                            style={styles.operatorDropdown}
                                            value={condition.operator}
                                            onChange={(e) => handleConditionChange(condition.id, 'operator', e.target.value)}
                                        >
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </select>
                                    )}
                                </div>

                                <select
                                    style={styles.dropdown}
                                    value={condition.question}
                                    onChange={(e) => handleConditionChange(condition.id, 'question', e.target.value)}
                                >
                                    <option value="">CHỌN</option>
                                    <option value="q1">Câu hỏi 1</option>
                                    <option value="q2">Câu hỏi 2</option>
                                    <option value="q3">Câu hỏi 3</option>
                                </select>

                                <select
                                    style={styles.dropdown}
                                    value={condition.answer}
                                    onChange={(e) => handleConditionChange(condition.id, 'answer', e.target.value)}
                                >
                                    <option value="">CHỌN</option>
                                    <option value="1">Đáp án 1</option>
                                    <option value="2">Đáp án 2</option>
                                    <option value="3">Đáp án 3</option>
                                </select>

                                {conditions.length > 1 && (
                                    <button
                                        style={styles.deleteButton}
                                        onClick={() => handleDeleteCondition(condition.id)}
                                        title="Xóa điều kiện"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>

                            {index === 0 && (
                                <div style={styles.conditionRow}>
                                    <div style={styles.operatorContainer}>
                                        <span style={styles.operatorLabel}>HOẶC</span>
                                    </div>

                                    <select style={styles.dropdown}>
                                        <option value="">CHỌN</option>
                                        <option value="q1">Câu hỏi 1</option>
                                        <option value="q2">Câu hỏi 2</option>
                                        <option value="q3">Câu hỏi 3</option>
                                    </select>

                                    <select style={styles.dropdown}>
                                        <option value="">CHỌN</option>
                                        <option value="1">Đáp án 1</option>
                                        <option value="2">Đáp án 2</option>
                                        <option value="3">Đáp án 3</option>
                                    </select>

                                    <button style={styles.deleteButtonYellow} title="Xóa điều kiện">
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    <div style={styles.addLogicContainer}>
                        <button style={styles.addConditionButton} onClick={handleAddCondition}>
                            Thêm logic
                        </button>
                    </div>
                </div>

                <div style={styles.jumpToContainer}>
                    <div style={styles.jumpToRow}>
                        <span style={styles.jumpToLabel}>THÌ</span>
                        <div style={styles.jumpToActionContainer}>
                            <button style={styles.jumpToButton}>
                                Hiện
                            </button>
                            <input
                                type="text"
                                style={styles.jumpToInput}
                                value={jumpToQuestion}
                                onChange={(e) => setJumpToQuestion(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.addConditionContainer}>
                    <button style={styles.addConditionDashed}>
                        Thêm điều kiện
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    modalContainer: {
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '600px',
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
    },
    title: {
        margin: 0,
        fontSize: '18px',
        color: '#333',
        fontWeight: 'bold',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#999',
        padding: '0',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#666',
        marginBottom: '20px',
        lineHeight: '1.5',
        border: '1px solid #e9ecef',
    },
    addButton: {
        backgroundColor: '#1890ff',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        width: '100%',
        transition: 'background-color 0.3s',
    },
    modalOverlay: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        padding: '0',
        maxWidth: '700px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#fff',
    },
    modalTitle: {
        margin: 0,
        fontSize: '14px',
        color: '#666',
        fontWeight: 'normal',
        textTransform: 'uppercase',
    },
    conditionContainer: {
        padding: '20px',
    },
    conditionRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '10px',
    },
    operatorContainer: {
        display: 'flex',
        alignItems: 'center',
        minWidth: '80px',
    },
    operatorLabel: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
    },
    operatorDropdown: {
        padding: '4px 8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '12px',
        backgroundColor: '#fff',
        marginLeft: '5px',
    },
    dropdown: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '14px',
        backgroundColor: '#fff',
        flex: 1,
        minWidth: '120px',
    },
    deleteButton: {
        backgroundColor: '#ff4444',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    deleteButtonYellow: {
        backgroundColor: '#ffcc00',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    addLogicContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0',
    },
    addConditionButton: {
        background: 'none',
        border: '2px dashed #ccc',
        color: '#666',
        cursor: 'pointer',
        fontSize: '14px',
        padding: '10px 20px',
        borderRadius: '4px',
        width: '100%',
        maxWidth: '200px',
    },
    jumpToContainer: {
        padding: '20px',
        borderTop: '1px solid #ddd',
    },
    jumpToRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    jumpToLabel: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
        minWidth: '40px',
    },
    jumpToActionContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    jumpToButton: {
        backgroundColor: '#52c41a',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '6px 12px',
        fontSize: '14px',
        cursor: 'pointer',
    },
    jumpToInput: {
        padding: '6px 12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '14px',
        width: '60px',
        textAlign: 'center' as const,
    },
    addConditionContainer: {
        padding: '20px',
        borderTop: '1px solid #ddd',
    },
    addConditionDashed: {
        background: 'none',
        border: '2px dashed #ccc',
        color: '#666',
        cursor: 'pointer',
        fontSize: '14px',
        padding: '15px',
        borderRadius: '4px',
        width: '100%',
    },
};