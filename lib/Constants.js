import {PropTypes} from 'react';

export const CONTEXT_TYPES = {
  setField: PropTypes.func,
  initField: PropTypes.func,
  getField: PropTypes.func,
  removeField: PropTypes.func,
  fields: PropTypes.object,
  setHasBeenTouched: PropTypes.func,
  canSubmit: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  submit: PropTypes.func
};

export const Validators = {
  isFilled: (errorMessage: string) => {
    return (name, {value}) => {
      if (!value || !value.length) {
        return errorMessage;
      }
    };
  }
};
