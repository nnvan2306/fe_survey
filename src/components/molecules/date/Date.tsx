import "./styles.scss";

const Date = () => {
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
            <div className="date-field">
                <label>Năm</label>
                <select>
                    {/* Options for Year (example range) */}
                    {[...Array(10)].map((_, i) => (
                        <option key={2020 + i} value={2020 + i}>
                            {2020 + i}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Date;
