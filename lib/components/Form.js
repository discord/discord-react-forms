/* @flow */

import React, {PropTypes} from 'react';
import {CONTEXT_TYPES} from '../Constants';

type Field = {
  value?: any,
  options?: Array<any>,
  validator?: func,
  hasDefaultValue: bool,
  hasBeenTouched: bool,
  error?: string,
  displayError: bool
}

type FormState = {fields: {[id:string]: Field}, canSubmit: boolean, isSubmitting: boolean};

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

    const canSubmit = this.canSubmit();
    this.setState({fields, canSubmit});
    onFieldUpdate(name, fields[name]);
  }

  setField({name, value, ...rest}: {name: string, value: string, rest: object}) {
    const {fields} = this.state;
    const {onFieldUpdate} = this.props;
    const field = fields[name];
    const oldValue = field.value;
    const error = this.getError(name);
    const hasBeenTouched = true;
    const displayError = field.displayError || value != oldValue;

    const newField = {...field, value, error, hasBeenTouched, displayError, ...rest};
    const newFields = {...fields};
    newFields[name] = newField;

    const canSubmit = this.canSubmit(newFields);
    this.setState({fields: newFields, canSubmit});

    onFieldUpdate(name, newField);
  }

  getField(name: string) {
    return this.state.fields[name];
  }

  setHasBeenTouched(name: string, touched: boolean=true) {
    const {fields} = this.state;
    const {onFieldUpdate} = this.props;
    fields[name].hasBeenTouched = touched;
    fields[name].error = this.getError(name);

    const canSubmit = this.canSubmit();
    this.setState({fields, canSubmit});

    onFieldUpdate(name, fields[name]);
  }

  getError(name: string) {
    const field = this.state.fields[name];
    const {validator} = field;
    return validator ? validator(name, field) : null;
  }

  canSubmit(fields=this.state.fields) {
    for (const key in fields) {
      const {hasDefaultValue, hasBeenTouched, error, validator} = fields[key];

      if ((error) || (!hasDefaultValue && !hasBeenTouched && validator != undefined)) {
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

  submitFinished(errors: {[key: string]: string}) {
    const {fields} = this.state;

    for (const key in errors) {
      fields[key].error = errors[key];
    }

    this.setState({isSubmitting: false, fields});
    this.setState({canSubmit: this.canSubmit()});
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
