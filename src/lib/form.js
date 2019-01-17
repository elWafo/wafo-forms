import React from 'react';
import validateField from './validation';
import styles from './styles';

/**
 * @typedef initialInputState
 * @type {Object}
 * @property {string} value The value of the input
 * @property {boolean} touched Indicates that the input value has changed
 * @property {boolean} valid Indicates if the input is valid (based on validations)
 * @property {array} errors array of errors. Check validation.js
 * @property {object} validations list of validation rules. Check validation.js
 */
const initialInputState = {
  value: '',
  touched: false,
  valid: false,
  errors: [],
  validations: {},
};

/**
 * @typedef initialState
 * @type {Object}
 * @property {initialInputState} form One for every props.children (input) in the form. The "name" of the input is the key.
 */
const initialState = {
  form: {},
};

class WafoForm extends React.Component {
  static defaultProps = {
    buttonText: '',
    onSubmit: f => f,
    values: undefined,
  };

  constructor(props) {
    super(props);
    this.state = initialState;

    // values = initial values to preload children
    const { children, values } = props;
    if (children.length > 1) {
      // setting up each children state
      for (let i = 0; i < children.length; i++) {
        const { form } = this.state;
        this.state = {
          form: {
            ...form,
            [children[i].props.name]: {
              ...initialInputState,
              // cheking if initial values exist
              value: (values && values[children[i].props.name]) ? values[children[i].props.name] : initialInputState.value,
              validations: children[i].props.validations,
            },
          },
        };
      }
    } else {
      this.state = {
        form: {
          [children.props.name]: {
            ...initialInputState,
            value: (values && values[children.props.name]) ? values[children.props.name] : initialInputState.value,
            validations: children.props.validations,
          },
        },
      };
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onSubmit(event) {
    if (event) { event.preventDefault(); } // event can be undefined if the function is not called normally

    const { onSubmit } = this.props;
    const { form: formState } = this.state;

    // checking every input validation
    const form = { valid: true };
    const newState = {};
    Object.keys(formState).forEach((field) => {
      const { form: { [field]: inputState } } = this.state;
      const validation = validateField(inputState.value, inputState.validations);
      if (!validation.valid) { form.valid = false; }

      form[field] = {
        value: inputState.value,
        valid: validation.valid,
        errors: validation.errors,
      };

      newState[field] = {
        ...inputState,
        touched: true,
        valid: validation.valid,
        errors: validation.errors,
      };
    });

    // updating state and sending values through callback
    this.setState({ form: newState }, () => {
      onSubmit(form);
    });
  }

  handleInputChange(input) {
    // the name of the input is the key
    const { target: { name, value } } = input;
    const { form: { [name]: inputState } } = this.state;

    const validation = validateField(value, inputState.validations);

    this.setState((prevState) => {
      const { form } = prevState;
      return {
        form: {
          ...form,
          [name]: {
            ...inputState,
            value,
            touched: true,
            valid: validation.valid,
            errors: validation.errors,
          },
        },
      };
    });
  }

  render() {
    const { buttonText } = this.props;
    let { children } = this.props;

    /** Modifying children props */
    children = React.Children.map(children, (child) => {
      const { form: { [child.props.name]: { value, valid, touched, errors } } } = this.state;
      return React.cloneElement(child, {
        handleInputChange: this.handleInputChange,
        value,
        valid,
        touched,
        errors,
      });
    });

    return (
      <form onSubmit={this.onSubmit}>
        <div className="row" style={styles.row}>
          {children}
        </div>
        {/** Only show the button if text is provided */}
        {buttonText && <button type="submit" className="btn btn-primary btn-submit">{buttonText}</button>}
      </form>
    );
  }
}

export default WafoForm;
