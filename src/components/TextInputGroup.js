import React from "react";
import classnames from "classnames";

const TextInputGroup = props => {
  const { label, type, value, name, onChange, error } = props;

  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">This is wrong</div>}
    </div>
  );
};

export default TextInputGroup;
