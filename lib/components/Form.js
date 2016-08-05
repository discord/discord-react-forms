/* @flow */

import React, {PropTypes} from 'react';
import TextInput from './TextInput';
import {CONTEXT_TYPES} from '../Constants';

type Field = {
  value?: any,
  options?: Array<any>,
  validator?: func,
  hasDefaultValue: bool,
  hasBeenTouched: bool,
  error?: string
}

const Form = React.createClass({
  childContextTypes: CONTEXT_TYPES,

  propTypes: {
    submit: PropTypes.func.isRequired,
    onFieldUpdate: PropTypes.func
  },

  getDefaultProps() {
    return {
      onFieldUpdate: () => {}
    };
  },

  getInitialState() {
    return {
      fields: {},
      canSubmit: false,
      isSubmitting: false
    };
  },

  getChildContext() {
    return {
      setField: this.setField,
      initField: this.initField,
      getField: this.getField,
      setHasBeenTouched: this.setHasBeenTouched,
      canSubmit: this.state.canSubmit,
      isSubmitting: this.state.isSubmitting,
      submit: this.submitForm
    };
  },

  initField({name, value, validator, hasDefaultValue}: {name: string, value: string, validator: func, hasDefaultValue: boolean}) {
    const {fields} = this.state;
    const {onFieldUpdate} = this.props;

    fields[name] = {
      value,
      validator,
      hasDefaultValue,
      hasBeenTouched: false,
      error: null
    };

    const canSubmit = this.canSubmit();
    this.setState({fields, canSubmit});

    onFieldUpdate(name, fields[name]);
  },

  setField({name, value}: {name: string, value: string}) {
    const {fields} = this.state;
    const {onFieldUpdate} = this.props;
    const field = fields[name];
    const {validator} = field;
    field.value = value;
    field.error = this.getError(name);
    field.hasBeenTouched = true;

    const canSubmit = this.canSubmit();
    this.setState({fields, canSubmit});

    onFieldUpdate(name, field);
  },

  getField(name: string) {
    return this.state.fields[name];
  },

  setHasBeenTouched(name: string, touched: boolean=true) {
    const {fields} = this.state;
    const {onFieldUpdate} = this.props;
    fields[name].hasBeenTouched = touched;
    fields[name].error = this.getError(name);

    const canSubmit = this.canSubmit();
    this.setState({fields, canSubmit});

    onFieldUpdate(name, fields[name]);
  },

  getError(name: string) {
    const field = this.state.fields[name];
    const {validator} = field;
    return validator ? validator(name, field) : null;
  },

  canSubmit() {
    const {fields} = this.state;

    for (const key in fields) {
      const elem = fields[key];
      const {hasDefaultValue, hasBeenTouched, error, validator} = fields[key];

      if ((error) || (!hasDefaultValue && !hasBeenTouched && validator != undefined)) {
        return false;
      }
    }

    return true;
  },

  submitForm() {
    const {submit} = this.props;
    const {fields} = this.state;

    this.setState({isSubmitting: true});

    const values = {};
    for (const key in fields) {
      values[key] = fields[key].value;
    }

    submit(values, this.submitFinished);
  },

  submitFinished(errors: {[key: string]: string}) {
    const {fields} = this.state;

    for (const key in errors) {
      fields[key].error = errors[key];
    }

    this.setState({isSubmitting: false, fields});
    this.setState({canSubmit: this.canSubmit()});
  },

  render() {
    const {isSubmitting} = this.state;
    const {children} = this.props;

    return (
      <form>
        {children}
      </form>
    );
  }
});

export default Form;
