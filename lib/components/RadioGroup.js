/* @flow */

import React, {PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import FieldMixin from './common/FieldMixin';
import FieldWrapper from './common/FieldWrapper';
import '../styles/RadioGroup.css';

@ReactMixin.decorate(FieldMixin)
class RadioGroup extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
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
    this.initField();
  }

  shouldComponentUpdate(_nextState, _nextProps, nextContext) {
    return this.shouldUpdate(nextContext);
  }

  onChange(value: string) {
    this.setField({value, hasBeenTouched: true});
  }

  render() {
    const {options, label, required} = this.props;
    const field = this.getField();
    const value = this.getValue();

    const radios = options.map((option, i) => {
      const onChange = this.onChange.bind(this, option.value);
      return (
        <div key={`radio-option-${i}`}>
          <input type="radio" checked={value == option.value} onChange={onChange} />
          <label onClick={onChange}>{option.label}</label>
        </div>
      );
    });

    return (
      <FieldWrapper error={field.error} required={required}
        label={label} displayError={field.displayError} className="forms-radio-group">
        {radios}
      </FieldWrapper>
    );
  }
}

export default RadioGroup;
