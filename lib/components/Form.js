/* @flow */

import React, {PropTypes} from 'react';
import {CONTEXT_TYPES} from '../Constants';

type Error = string | ReactClass<any>;

type Field = {
  value?: any,
  options?: Array<any>,
  validator?: func,
  hasDefaultValue: bool,
  hasBeenTouched: bool,
  error?: Error,
  displayError: bool
}

type Fields = {[id: string]: Field};
type Errors = {[key: string]: Errors};
type FormState = {fields: Fields, canSubmit: boolean, isSubmitting: boolean};

class Form extends React.Component {
  static childContextTypes = CONTEXT_TYPES;

  static propTypes = {
    submit: PropTypes.func.isRequired,
    onFieldUpdate: PropTypes.func
  };

  static defaultProps = {
    onFieldUpdate: () => {}
  };

  state : FormState = {
    fields: {},
    canSubmit: false,
    isSubmitting: false
  }

  getChildContext() {
    return {
      setField: ::this.setField,
      initField: ::this.initField,
      removeField: ::this.removeField,
      getField: ::this.getField,
      fields: this.state.fields,
      setHasBeenTouched: ::this.setHasBeenTouched,
      canSubmit: this.state.canSubmit,
      isSubmitting: this.state.isSubmitting,
      submit: ::this.submitForm
    };
  }

  initField({name, value, validator, hasDefaultValue, ...rest}:
    {name: string, value: string, validator: func, hasDefaultValue: boolean, rest: object}) {
    const {fields} = this.state;
    const {onFieldUpdate} = this.props;

    fields[name] = {
      value,
      validator,
      hasDefaultValue,
      hasBeenTouched: false,
      error: null,
      displayError: false,
      ...rest
    };

    fields[name].error = this.getError(name, fields[name]);

    const canSubmit = this.canSubmit();
    this.setState({fields, canSubmit});
    onFieldUpdate(name, fields[name]);
  }

  setField({name, value, ...rest}: {name: string, value: string, rest: object}) {
    const {fields} = this.state;
    const {onFieldUpdate} = this.props;
    const field = fields[name];
    const oldValue = field.value;
    const displayError = field.displayError || value != oldValue && field.hasBeenTouched;

    const newField = {...field, value, error: field.error, displayError, ...rest};
    newField.error = this.getError(name, newField);

    const newFields = {...fields, [name]: newField};

    const canSubmit = this.canSubmit(newFields);
    this.setState({fields: newFields, canSubmit});

    onFieldUpdate(name, newField);
  }

  removeField(name: string) {
    const {fields} = this.state;
    const {onFieldUpdate} = this.props;
    const newFields = {...fields};

    delete newFields[name];

    const canSubmit = this.canSubmit(newFields);
    this.setState({fields: newFields, canSubmit});

    onFieldUpdate(name, null);
  }

  getField(name: string) {
    return this.state.fields[name];
  }

  setHasBeenTouched(name: string, touched: boolean=true) {
    const {fields} = this.state;
    const {onFieldUpdate} = this.props;
    const newFields = {...fields};
    const error = this.getError(name, fields[name]);

    newFields[name] = {...newFields[name], hasBeenTouched: touched, error, displayError: touched};

    const canSubmit = this.canSubmit();
    this.setState({fields: newFields, canSubmit});

    onFieldUpdate(name, newFields[name]);
  }

  getError(name, field: Field, fields: Fields=this.state.fields) {
    const {validator} = field;
    return validator ? validator(name, field, fields) : null;
  }

  canSubmit(fields: Fields=this.state.fields) {
    for (const key in fields) {
      if (fields[key].error) {
        return false;
      }
    }

    return true;
  }

  submitForm() {
    const {submit} = this.props;
    const {fields} = this.state;

    this.setState({isSubmitting: true});

    const values = {};
    for (const key in fields) {
      values[key] = fields[key].value;
    }

    submit(values, ::this.submitFinished);
  }

  submitFinished(errors: Errors) {
    const {fields} = this.state;
    const newFields = {...fields};

    for (const key in errors) {
      newFields[key] = {...newFields[key], error: errors[key]};
    }

    this.setState({isSubmitting: false, fields: newFields});
    this.setState({canSubmit: this.canSubmit(newFields)});
  }

  render() {
    const {children} = this.props;

    return (
      <form className="forms-form">
        {children}
      </form>
    );
  }
}

export default Form;
