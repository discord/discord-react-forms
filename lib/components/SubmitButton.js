/* @flow */

import React, {PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import FieldMixin from './common/FieldMixin';
import '../styles/SubmitButton.css';

@ReactMixin.decorate(FieldMixin)
class SubmitButton extends React.Component {
  static propTypes = {
    canSubmitText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    cannotSubmitText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    isSubmittingText: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  };

  shouldComponentUpdate(_nextState, _nextProps, nextContext) {
    return nextContext.canSubmit != this.canSubmit() || nextContext.isSubmitting != this.isSubmitting();
  }

  render() {
    const {isSubmittingText, canSubmitText, cannotSubmitText} = this.props;

    if (this.isSubmitting()) {
      return (
        <div className="forms-submit-button forms-submitting">{isSubmittingText}</div>
      );
    }
    else if (this.canSubmit()) {
      return (
        <div className="forms-submit-button forms-can-submit" onClick={::this.submit}>{canSubmitText}</div>
      );
    }
    else {
      return (
        <div className="forms-submit-button forms-cannot-submit">{cannotSubmitText}</div>
      );
    }
  }
}

export default SubmitButton;
