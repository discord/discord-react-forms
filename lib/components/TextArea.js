/* @flow */

import React, {PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import FieldMixin from './common/FieldMixin';
import FieldWrapper from './common/FieldWrapper';
import '../styles/TextArea.css';

@ReactMixin.decorate(FieldMixin)
class TextArea extends React.Component {
  static propTypes = {
    intervalCheck: PropTypes.number,
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    required: PropTypes.bool,
    validator: PropTypes.func,
    value: PropTypes.string
  };

  static defaultProps = {
    value: '',
    required: false
  };

  componentWillMount() {
    const {value} = this.props;
    this.initField({hasDefaultValue: value && value.length});
  }

  shouldComponentUpdate(_nextState, _nextProps, nextContext) {
    return this.shouldUpdate(nextContext);
  }

  onChange({target}: {target: HTMLInputElement}) {
    this.setField({value: target.value});
  }

  render() {
    const {label, required, rest, name} = this.props;
    const field = this.getField();

    return (
      <FieldWrapper required={required} error={field.error}
        label={label} displayError={field.displayError} className="forms-text-area">
        <textarea
          className="forms-text-area-input"
          value={this.getValue()}
          onChange={::this.onChange}
          onBlur={::this.setHasBeenTouched}
          name={name}
          ref={::this.setRef}
          {...rest} />
      </FieldWrapper>
    );
  }
}

export default TextArea;
