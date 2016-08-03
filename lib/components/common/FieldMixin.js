import React from 'react';
import {CONTEXT_TYPES} from '../../Constants';

const FieldMixin = {
  contextTypes: CONTEXT_TYPES,

  getField(name=this.props.name) {
    return this.context.getField(name);
  },

  initField(obj) {
    const {name, value, validator} = this.props;
    return this.context.initField({name, value, validator, ...obj});
  },

  setHasBeenTouched({name=this.props.name, touched=true}={}) {
    return this.context.setHasBeenTouched(name, touched);
  },

  setField({name=this.props.name, ...rest}={}) {
    return this.context.setField({name, ...rest});
  },

  isSubmitting() {
    return this.context.isSubmitting;
  },

  canSubmit() {
    return this.context.canSubmit;
  },

  submit() {
    return this.context.submit();
  }
};

export default FieldMixin;
