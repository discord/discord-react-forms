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
    submit: PropTypes.func.isRequired
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

  componentDidMount() {
    for (const key in this.refs) {
      console.log(key);
    }
  },

  initField({name, value, validator, hasDefaultValue}) {
    const {fields} = this.state;

    fields[name] = {
      value,
      validator,
      hasDefaultValue,
      hasBeenTouched: false,
      error: null
    };

    const canSubmit = this.canSubmit();

    this.setState({fields, canSubmit});
  },

  setField({name, value}) {
    const {fields} = this.state;
    const field = fields[name];
    const {validator} = field;
    field.value = value;
    field.error = this.getError(name);
    field.hasBeenTouched = true;

    const canSubmit = this.canSubmit();
    this.setState({fields, canSubmit});
  },

  getField(name) {
    return this.state.fields[name];
  },

  setHasBeenTouched(name, touched=true) {
    const {fields} = this.state;
    fields[name].hasBeenTouched = touched;
    fields[name].error = this.getError(name);

    const canSubmit = this.canSubmit();
    this.setState({fields, canSubmit});
  },

  getError(name) {
    const field = this.state.fields[name];
    const {validator} = field;
    return validator ? validator({field}) : null;
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

  submitFinished(errors) {
    const {fields} = this.state;

    for (const key in errors) {
      fields[key].error = errors[key];
    }

    this.setState({isSubmitting: false, fields});
    this.setState({canSubmit: this.canSubmit()});
  },

  render() {
    const {isSubmittable, isSubmitting, submitFormFn} = this.state;
    const {children} = this.props;

    return (
      <form>
        {children}
      </form>
    );
  }
});

export default Form;
