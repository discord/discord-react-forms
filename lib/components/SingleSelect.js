/* @flow */

import React, {PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import FieldMixin from './common/FieldMixin';
import FieldWrapper from './common/FieldWrapper';
import '../styles/SingleSelect.css';

@ReactMixin.decorate(FieldMixin)
class SingleSelect extends React.Component {
  static propTypes = {
    intervalCheck: PropTypes.number,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    validator: PropTypes.func,
    value: PropTypes.string
  };

  static defaultProps = {
    required: false
  };

  componentWillMount() {
    const {value, options, placeholder} = this.props;
    let defaultValue = '';
    if (value) {
      defaultValue = value;
    }
    else if (placeholder) {
      defaultValue = '';
    }
    else if (options && options[0]) {
      defaultValue = options[0].value;
    }

    this.initField({value: defaultValue});
  }

  shouldComponentUpdate(_nextState, _nextProps, nextContext) {
    return this.shouldUpdate(nextContext);
  }

  onChange({target}: {target: HTMLInputElement}) {
    this.setField({value: target.value, hasBeenTouched: true});
  }

  render() {
    const {label, placeholder, required, name} = this.props;
    const field = this.getField();

    const options = this.props.options.map((option, i) => {
      const value = option.value ? option.value : option;
      const label = option.label ? option.label : value;
      return (
        <option key={`option-${i}`} value={value}>{label}</option>
      );
    });

    const placeholderNode = placeholder ? <option disabled>{placeholder}</option> : null;

    return (
      <FieldWrapper error={field.error} required={required} label={label}
        displayError={field.displayError} className="forms-single-select">
        <select onChange={::this.onChange} value={field.value} name={name} ref={::this.setRef}>
          {placeholderNode}
          {options}
        </select>
      </FieldWrapper>
    );
  }
}

export default SingleSelect;
