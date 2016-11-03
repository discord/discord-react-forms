/* @flow */

import React, {PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import FieldWrapper from './common/FieldWrapper';
import FieldMixin from './common/FieldMixin';
import '../styles/TextInput.css';

@ReactMixin.decorate(FieldMixin)
class TextInput extends React.Component {
  static propTypes = {
    intervalCheck: PropTypes.number,
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    validator: PropTypes.func,
    value: PropTypes.string
  }

  static defaultProps = {
    placeholder: '',
    value: '',
    required: false
  };

  componentWillMount() {
    const {value} = this.props;
    this.initField({hasDefaultValue: value.length != 0});
  }

  shouldComponentUpdate(_nextState, _nextProps, nextContext) {
    return this.shouldUpdate(nextContext);
  }

  onChange({target}: {target: HTMLInputElement}) {
    this.setField({value: target.value});
  }

  render() {
    const {required, placeholder, label, name} = this.props;
    const field = this.getField();

    return (
      <FieldWrapper error={field.error} displayError={field.displayError}
        required={required} label={label} className="forms-text-input">
        <input type="text"
               ref={::this.setRef}
               name={name}
               value={this.getValue()}
               placeholder={placeholder}
               onChange={::this.onChange}
               onBlur={::this.setHasBeenTouched}
               className="forms-text-input-input" />
      </FieldWrapper>
    );
  }
}

export default TextInput;
