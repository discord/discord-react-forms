/* @flow */

import React, {PropTypes} from 'react';
import FieldWrapper from './common/FieldWrapper';
import FieldMixin from './common/FieldMixin';
import styles from '../styles/TextInput.css';

const TextInput = React.createClass({
  mixins: [FieldMixin],

  propTypes: {
    intervalCheck: PropTypes.number,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    validator: PropTypes.func,
    value: PropTypes.string
  },

  getDefaultProps() {
    return {
      placeholder: '',
      value: '',
      required: false
    };
  },

  componentWillMount() {
    const {value} = this.props;
    this.initField({hasDefaultValue: value.length != 0});
  },

  onChange({target}: {target: HTMLInputElement}) {
    this.setField({value: target.value});
  },

  render() {
    const {required, placeholder, label, name} = this.props;
    const field = this.getField();

    return (
      <FieldWrapper error={field.error} displayError={field.displayError} required={required} label={label}>
        <input type="text"
               ref={this.setRef}
               name={name}
               value={this.getValue()}
               placeholder={placeholder}
               onChange={this.onChange}
               onBlur={this.setHasBeenTouched}
               className={styles.textInput} />
      </FieldWrapper>
    );
  }
});

export default TextInput;
