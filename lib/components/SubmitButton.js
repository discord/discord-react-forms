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

    if (this.isSubmitting()) {
      return (
        <div>{isSubmittingText}</div>
      );
    }
    else if (this.canSubmit()) {
      return (
        <div onClick={this.submit}>{canSubmitText}</div>
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
