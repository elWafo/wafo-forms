import React from 'react';
import PropTypes from 'prop-types';

const WafoFormTextArea = ({
  customClass, name, label, placeholder, extraProps, children,
  value, handleInputChange, onChangeCallback, onBlurCallback,
  valid, touched, errors,
}) => (
  <div className={`form-group wafo-input ${customClass}`}>
    {label && <label htmlFor={name}>{label}</label>}
    <textarea
      className="form-control"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        handleInputChange(event);
        onChangeCallback(event);
      }}
      onBlur={onBlurCallback}
      {...extraProps}
    />
    {children}
    {!valid && touched
      && (
        <ul className="errors">
          {errors.map(error => (<li key={error.error}>{error.message}</li>))}
        </ul>
      )
    }
  </div>
);

WafoFormTextArea.propTypes = {
  customClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  extraProps: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element).isRequired,
    PropTypes.element.isRequired,
    () => null,
  ]),
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
  onChangeCallback: PropTypes.func,
  onBlurCallback: PropTypes.func,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.any),
  validations: PropTypes.object,
};

WafoFormTextArea.defaultProps = {
  customClass: '',
  label: undefined,
  placeholder: '',
  extraProps: {},
  children: null,
  value: '',
  handleInputChange: f => f,
  onChangeCallback: f => f,
  onBlurCallback: f => f,
  valid: false,
  touched: false,
  errors: [],
  validations: {},
};

export default WafoFormTextArea;