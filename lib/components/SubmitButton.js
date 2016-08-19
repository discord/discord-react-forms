/* @flow */

import React, {PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import FieldMixin from './common/FieldMixin';
import styles from '../styles/SubmitButton.css';

@ReactMixin.decorate(FieldMixin)
class SubmitButton extends React.Component {
  static propTypes = {
    canSubmitText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    cannotSubmitText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    isSubmittingText: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  };

  shouldComponentUpdate(_nextState, _nextProps, nextContext) {
    return nextContext.canSubmit != this.canSubmit();
  }

  render() {
    const {isSubmittingText, canSubmitText, cannotSubmitText} = this.props;
    const className = styles.submitButton;
    console.log('render');

    if (this.isSubmitting()) {
      return (
        <div className={`${className} ${styles.submitting}`}>{isSubmittingText}</div>
      );
    }
    else if (this.canSubmit()) {
      return (
        <div className={`${className} ${styles.canSubmit}`} onClick={::this.submit}>{canSubmitText}</div>
      );
    }
    else {
      return (
        <div className={`${className} ${styles.cannotSubmit}`}>{cannotSubmitText}</div>
      );
    }
  }
}

export default SubmitButton;
