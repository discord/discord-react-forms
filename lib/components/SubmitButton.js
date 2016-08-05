/* @flow */

import React, {PropTypes} from 'react';
import FieldMixin from './common/FieldMixin';
import styles from '../styles/SubmitButton.css';

const SubmitButton = React.createClass({
  mixins: [FieldMixin],

  propTypes: {
    canSubmitText: PropTypes.string,
    cannotSubmitText: PropTypes.string,
    isSubmittingText: PropTypes.string
  },

  render() {
    const {isSubmittingText, canSubmitText, cannotSubmitText} = this.props;
    const className = styles.submitButton;

    if (this.isSubmitting()) {
      return (
        <div className={`${className} ${styles.submitting}`}>{isSubmittingText}</div>
      );
    }
    else if (this.canSubmit()) {
      return (
        <div className={`${className} ${styles.canSubmit}`} onClick={this.submit}>{canSubmitText}</div>
      );
    }
    else {
      return (
        <div className={`${className} ${styles.cannotSubmit}`}>{cannotSubmitText}</div>
      );
    }
  }
});

export default SubmitButton;
