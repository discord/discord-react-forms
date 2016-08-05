/* @flow */

import React, {PropTypes} from 'react';
import FieldMixin from './common/FieldMixin';

const SubmitButton = React.createClass({
  mixins: [FieldMixin],

  propTypes: {
    canSubmitText: PropTypes.string,
    cannotSubmitText: PropTypes.string,
    isSubmittingText: PropTypes.string
  },

  render() {
    const {isSubmittingText, canSubmitText, cannotSubmitText} = this.props;
    const className = 'form-submit-button';

    if (this.isSubmitting()) {
      return (
        <div className={`${className} submitting`}>{isSubmittingText}</div>
      );
    }
    else if (this.canSubmit()) {
      return (
        <div className={`${className} can-submit`} onClick={this.submit}>{canSubmitText}</div>
      );
    }
    else {
      return (
        <div className={`${className} cannot-submit`}>{cannotSubmitText}</div>
      );
    }
  }
});

export default SubmitButton;
