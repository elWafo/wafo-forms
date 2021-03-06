import React from "react";
import PropTypes from "prop-types";

const WafoFormSelect = ({
  customClass,
  name,
  label,
  labelClass,
  defaultValue,
  options,
  extraProps,
  children,
  value,
  handleInputChange,
  onChangeCallback,
  onBlurCallback,
  valid,
  touched,
  errors
}) => (
  <div className={`wafo-wrapper ${customClass}`}>
    <div className="wafo-input form-group">
      {label && (
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
      )}
      <select
        className="form-control"
        name={name}
        value={value}
        onChange={event => {
          handleInputChange(event);
          onChangeCallback(event);
        }}
        onBlur={onBlurCallback}
        {...extraProps}
      >
        <option value="" disabled>
          {defaultValue}
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.display}
          </option>
        ))}
      </select>
    </div>
    {children}
    {!valid && touched && (
      <ul className="errors">
        {errors.map(error => (
          <li key={error.error}>{error.message}</li>
        ))}
      </ul>
    )}
  </div>
);

WafoFormSelect.propTypes = {
  handleChange: PropTypes.bool,
  customClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      display: PropTypes.node
    })
  ),
  extraProps: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element).isRequired,
    PropTypes.element.isRequired,
    () => null
  ]),
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
  onChangeCallback: PropTypes.func,
  onBlurCallback: PropTypes.func,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.any),
  validations: PropTypes.object
};

WafoFormSelect.defaultProps = {
  handleChange: true,
  customClass: "",
  label: undefined,
  labelClass: "",
  defaultValue: "Select an option",
  options: [],
  extraProps: {},
  children: null,
  value: "",
  handleInputChange: f => f,
  onChangeCallback: f => f,
  onBlurCallback: f => f,
  valid: false,
  touched: false,
  errors: [],
  validations: {}
};

export default WafoFormSelect;
