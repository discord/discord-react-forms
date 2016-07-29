import {PropTypes} from 'react';

export const ContextTypes = {
  setValue: PropTypes.func,
  initValue: PropTypes.func,
  getField: PropTypes.func,
  setHasBeenTouched: PropTypes.func,
  canSubmit: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  submit: PropTypes.func
};
