import { useState } from "react";
import styles from "./formInput.module.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="form-group">
      <div className={styles.formInput}>
        <label>{label}</label>
        <input
          className="field"
          autoComplete="off"
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          type={props.type ? props.type : "text"}
          onFocus={() =>
            inputProps.name === "confirmPassword" && setFocused(true)
          }
          focused={focused.toString()}
        />
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};

export default FormInput;
