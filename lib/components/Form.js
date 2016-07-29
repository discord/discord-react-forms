/* @flow */

import React from 'react';
import TextInput from './TextInput';
import {ContextTypes} from '../Constants';

type Field = {
  value?: any,
  options?: Array<any>,
  validator?: func,
  required: bool,
  hasDefaultValue: bool,
  hasBeenTouched: bool,
  error?: string
}

const Form = React.createClass({
  childContextTypes: ContextTypes,

  propTypes: {
    onSubmit: React.PropTypes.func,
    onError: React.PropTypes.func
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
      setValue: this.setValue,
      initValue: this.initValue,
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

  initValue({name, value, validator, required, hasDefaultValue}) {
    const {fields} = this.state;

    fields[name] = {
      value,
      validator,
      required,
      hasDefaultValue,
      hasBeenTouched: false,
      error: null
    };

    const canSubmit = this.canSubmit();

    this.setState({fields, canSubmit});
  },

  setValue({name, value}) {
    const {fields} = this.state;
    const field = fields[name];
    const {validator, required} = field;
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
    const {validator, required} = field;
    return validator && required ? validator({field}) : null;
  },

  canSubmit() {
    const {fields} = this.state;

    for (const key in fields) {
      const elem = fields[key];
      const {hasDefaultValue, hasBeenTouched, error, required} = fields[key];

      if ((error) || (!hasDefaultValue && !hasBeenTouched && required)) {
        return false;
      }
    }

    return true;
  },

  submitForm() {
    this.setState({isSubmitting: true});

    // submit
    setTimeout(() => {
      this.setState({isSubmitting: false});
      // call onSubmit or onError
    }, 1000);
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
