import "./styles.scss";

const Time = () => {
    return (
        <div className="date-container">
            <div className="date-field">
                <label>Giờ</label>
                <select>
                    {/* Options for Day */}
                    {[...Array(23)].map((_, i) => (
                        <option key={i} value={i}>
                            {i}
                        </option>
                    ))}
                </select>
            </div>
            <div className="date-field">
                <label>Phút</label>
                <select>
                    {/* Options for Month */}
                    {[...Array(59)].map((_, i) => (
                        <option key={i} value={i}>
                            {i}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Time;
