import "./styles.scss";

const DateMonth = () => {
    return (
        <div className="date-container">
            <div className="date-field">
                <label>Ngày</label>
                <select>
                    {/* Options for Day */}
                    {[...Array(31)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div className="date-field">
                <label>Tháng</label>
                <select>
                    {/* Options for Month */}
                    {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DateMonth;
