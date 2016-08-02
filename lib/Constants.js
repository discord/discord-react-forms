import {PropTypes} from 'react';

export const CONTEXT_TYPES = {
  setField: PropTypes.func,
  initField: PropTypes.func,
  getField: PropTypes.func,
  setHasBeenTouched: PropTypes.func,
  canSubmit: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  submit: PropTypes.func
};
