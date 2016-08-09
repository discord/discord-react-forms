/* @flow */

import React, {PropTypes} from 'react';
import FieldMixin from './common/FieldMixin';
import FieldWrapper from './common/FieldWrapper';

const SingleSelect = React.createClass({
  mixins: [FieldMixin],

  propTypes: {
    intervalCheck: PropTypes.number,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    validator: PropTypes.func,
    value: PropTypes.string
  },

  getDefaultProps() {
    return {
      required: false
    };
  },

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
  },

  onChange({target}: {target: HTMLInputElement}) {
    this.setField({value: target.value});
  },

  render() {
    const {label, placeholder, required, name} = this.props;
    const field = this.getField();

    const options = this.props.options.map((option, i) => {
      const label = option.label ? option.label : option.value;
      return (
        <option key={`option-${i}`} value={option.value}>{label}</option>
      );
    });

    const placeholderNode = placeholder ? <option disabled>{placeholder}</option> : null;

    return (
      <FieldWrapper error={field.error} required={required} label={label}>
        <select onChange={this.onChange} value={field.value} name={name} ref={this.setRef}>
          {placeholderNode}
          {options}
        </select>
      </FieldWrapper>
    );
  }
});

export default SingleSelect;
