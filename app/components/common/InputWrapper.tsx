import React from 'react';

interface IProps {
  id: string;
  children: React.ReactNode;
  label?: string;
  error?: string;
  className?: string;
  explain?: string;
  required?: boolean;
}

const InputWrapper: React.FC<IProps> = ({ children, label, error, className, explain, id, required }) => {
  return (
    <div className={`form-group ${className ?? ''}`}>
      {label && (
        <label htmlFor={id}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      {children}
      {explain && !error && <sub className="field-explain">({explain})</sub>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default InputWrapper;
