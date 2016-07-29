import React, {PropTypes} from 'react';
import {ContextTypes} from '../Constants';

const SubmitButton = React.createClass({
  contextTypes: ContextTypes,

  propTypes: {
    canSubmitText: PropTypes.string,
    cannotSubmitText: PropTypes.string,
    isSubmittingText: PropTypes.string
  },

  render() {
    const {isSubmittingText, canSubmitText, cannotSubmitText} = this.props;
    const {isSubmitting, canSubmit, submit} = this.context;

    if (isSubmitting) {
      return (
        <div>{isSubmittingText}</div>
      );
    }
    else if (canSubmit) {
      return (
        <div onClick={submit}>{canSubmitText}</div>
      );
    }
    else {
      return (
        <div>{cannotSubmitText}</div>
      );
    }
  }
});

export default SubmitButton;
