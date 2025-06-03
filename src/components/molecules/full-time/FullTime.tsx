import "./styles.scss";

const FullTime = () => {
    return (
        <div className="">
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
        </div>
    );
};

export default FullTime;
