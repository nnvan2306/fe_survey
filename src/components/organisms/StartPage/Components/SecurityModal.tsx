import React, { useEffect, useState } from 'react';
import styles from './SecurityModal.module.scss';

interface SecurityModalProps {
  open: boolean;
  onClose: () => void;
  onSavePassword: (password: string) => void;
  initialPassword: string;
}

const SecurityModal: React.FC<SecurityModalProps> = ({ open, onClose, onSavePassword, initialPassword }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'individual'>('general');
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  useEffect(() => {
    setPassword(initialPassword);
  }, [initialPassword]);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    onSavePassword(password);
    onClose();
  };

  return (
    <div className={`${styles['modal-background']} fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 ease-out' : 'opacity-0 ease-in pointer-events-none'}`}>
      <div className={`${styles['modal-container']} w-full max-w-2xl`}>
        <div className={`flex items-center justify-between px-6 py-4 ${styles['modal-header']}`}>
          <h2 className={`${styles['modal-title']}`}>
            MẬT KHẨU TRUY CẬP KHẢO SÁT
          </h2>
          <button
            onClick={onClose}
            className={`${styles['close-button']} transition-colors`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 pt-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex-1 flex items-center justify-center px-4 py-3 ${styles['tab-button']} transition-colors ${activeTab === 'general'
                ? styles['tab-button-general-active']
                : styles['tab-button-general-inactive']
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Mật khẩu chung
            </button>
            <button
              onClick={() => setActiveTab('individual')}
              className={`flex-1 flex items-center justify-center px-4 py-3 ml-1 ${styles['tab-button']} transition-colors ${activeTab === 'individual'
                ? styles['tab-button-individual-active']
                : styles['tab-button-individual-inactive']
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Mật khẩu cho từng người
            </button>
          </div>
        </div>

        <div className="px-6 py-8">
          {activeTab === 'general' ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className={`${styles['section-title']} mb-2`}>
                  ĐẶT MẬT KHẨU CHUNG CHO KHẢO SÁT
                </h3>
                <div className={`${styles['divider-line']} w-12 h-0.5 mx-auto`}></div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu tại đây"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${styles['input-field']} w-full px-4 py-3 pr-12`}
                  />
                  <button
                    type="button"
                    onClick={handlePasswordToggle}
                    className={`${styles['password-toggle-button']} absolute right-3 top-1/2 transform -translate-y-1/2`}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .274 0 .543.013.81.042M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.825 4.125A10.05 10.05 0 0122 12c-1.274-4.057-5.064-7-9.542-7a9.953 9.953 0 00-4.07 1.157m-.358 4.103a9.94 9.94 0 01-1.638-.971M3 21l20-20"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                <div>
                  <h4 className={`${styles['label-text']} mb-2`}>
                    Điều chỉnh câu yêu cầu nhập mật khẩu (Không bắt buộc)
                  </h4>
                  <input
                    type="text"
                    placeholder="Vui lòng nhập mật khẩu truy cập khảo sát"
                    className={`${styles['input-field']} w-full px-3 py-2`}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className={`${styles['section-title']} mb-2`}>
                  ĐẶT MẬT KHẨU RIÊNG CHO TỪNG NGƯỜI
                </h3>
                <div className={`${styles['divider-line']} w-12 h-0.5 mx-auto mb-4`}></div>
                <p className={`${styles['disabled-text']}`}>
                  Vui lòng nâng cấp tài khoản để sử dụng tính năng này!
                </p>
              </div>

              <div>
                <h4 className={`${styles['label-text']} mb-2`}>
                  Điều chỉnh câu yêu cầu nhập mật khẩu (Không bắt buộc)
                </h4>
                <input
                  type="text"
                  placeholder="Vui lòng nhập mật khẩu truy cập khảo sát"
                  className={`${styles['input-field']} w-full px-3 py-2`}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className={`flex justify-end px-6 py-4 ${styles['modal-footer']}`}>
          <button
            onClick={handleSubmit}
            className={`${styles['submit-button']} px-6 py-2 transition-colors`}
          >
            ĐỒNG Ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityModal;

