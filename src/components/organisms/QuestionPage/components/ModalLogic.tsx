/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export default function LogicComponent() {
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
        { id: 1, question: '', answer: '' }
    ]);

    const handleAddCondition = () => {
        const newCondition = {
            id: conditions.length + 1,
            question: '',
            answer: ''
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
                    <h4 style={styles.modalTitle}>Cài đặt Logic</h4>
                    <button style={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div style={styles.conditionContainer}>
                    <h5 style={styles.sectionTitle}>Điều kiện</h5>

                    {conditions.map((condition, index) => (
                        <div key={condition.id} style={styles.conditionRow}>
                            <span style={styles.label}>
                                {index === 0 ? 'NẾU' : 'VÀ'}
                            </span>

                            <select
                                style={styles.dropdown}
                                value={condition.question}
                                onChange={(e) => handleConditionChange(condition.id, 'question', e.target.value)}
                            >
                                <option value="">CHỌN CÂU HỎI</option>
                                <option value="q1">Câu hỏi 1</option>
                                <option value="q2">Câu hỏi 2</option>
                                <option value="q3">Câu hỏi 3</option>
                            </select>

                            <select
                                style={styles.dropdown}
                                value={condition.answer}
                                onChange={(e) => handleConditionChange(condition.id, 'answer', e.target.value)}
                            >
                                <option value="">CHỌN ĐÁP ÁN</option>
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
                                    🗑️
                                </button>
                            )}
                        </div>
                    ))}

                    <button style={styles.addConditionButton} onClick={handleAddCondition}>
                        + Thêm điều kiện
                    </button>
                </div>

                <div style={styles.jumpToContainer}>
                    <div style={styles.jumpToHeader}>
                        <span style={styles.label}>Nhảy tới</span>
                        <select style={styles.jumpToDropdown}>
                            <option value="">Chọn câu hỏi đích</option>
                            <option value="q1">Câu hỏi 1</option>
                            <option value="q2">Câu hỏi 2</option>
                            <option value="q3">Câu hỏi 3</option>
                            <option value="end">Kết thúc khảo sát</option>
                        </select>
                    </div>
                    <div style={styles.jumpToBar}></div>
                </div>

                <div style={styles.modalActions}>
                    <button style={styles.cancelButton} onClick={onClose}>
                        Hủy
                    </button>
                    <button style={styles.saveButton}>
                        Lưu logic
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
        position: 'fixed',
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
        backgroundColor: '#fff',
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
        padding: '20px',
        borderBottom: '1px solid #eee',
    },
    modalTitle: {
        margin: 0,
        fontSize: '18px',
        color: '#333',
        fontWeight: 'bold',
    },
    sectionTitle: {
        margin: '0 0 15px 0',
        fontSize: '16px',
        color: '#333',
        fontWeight: '600',
    },
    conditionContainer: {
        padding: '20px',
        borderBottom: '1px solid #eee',
    },
    conditionRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '15px',
        padding: '12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        border: '1px solid #e9ecef',
    },
    label: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
        minWidth: '40px',
    },
    dropdown: {
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        fontSize: '14px',
        backgroundColor: '#fff',
        minWidth: '150px',
        flex: 1,
    },
    deleteButton: {
        backgroundColor: '#ff4d4f',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '14px',
    },
    addConditionButton: {
        background: 'none',
        border: '2px dashed #1890ff',
        color: '#1890ff',
        cursor: 'pointer',
        fontSize: '14px',
        padding: '10px',
        borderRadius: '6px',
        width: '100%',
        fontWeight: '500',
    },
    jumpToContainer: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
    },
    jumpToHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '15px',
    },
    jumpToDropdown: {
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        fontSize: '14px',
        backgroundColor: '#fff',
        minWidth: '200px',
    },
    jumpToBar: {
        backgroundColor: '#52c41a',
        height: '8px',
        borderRadius: '4px',
        marginTop: '10px',
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        padding: '20px',
        borderTop: '1px solid #eee',
    },
    cancelButton: {
        backgroundColor: '#fff',
        color: '#666',
        border: '1px solid #ddd',
        borderRadius: '6px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    saveButton: {
        backgroundColor: '#52c41a',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    },
};