import React from 'react';
import {CONTEXT_TYPES} from '../../Constants';

const FieldMixin = {
  contextTypes: CONTEXT_TYPES,

  getField() {
    return this.context.getField(this.props.name);
  },

  initField(obj) {
    const {name, value, validator} = this.props;
    return this.context.initField({name, value, validator, ...obj});
  },

  setHasBeenTouched(touched=true) {
    return this.context.setHasBeenTouched(this.props.name, touched);
  },

  setField(obj) {
    const {name} = this.props;
    return this.context.setField({name, ...obj});
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
