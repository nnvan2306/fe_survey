import "./styles.scss";

const Year = () => {
    return (
        <div className="date-container">
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

export default Year;
