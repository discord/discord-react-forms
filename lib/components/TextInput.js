import React, {PropTypes} from 'react';
import Wrapper from './common/Wrapper';
import FieldMixin from './common/FieldMixin';

const TextInput = React.createClass({
  mixins: [FieldMixin],

  propTypes: {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.any,
    required: PropTypes.bool,
    validator: PropTypes.func,
    value: PropTypes.any
  },

  getDefaultProps() {
    return {
      placeholder: '',
      value: ''
    };
  },

  componentWillMount() {
    const {value} = this.props;
    this.initField({hasDefaultValue: value.length != 0});
  },

  onChange(e) {
    this.setField({value: e.target.value});
  },

  render() {
    const {required, placeholder, label} = this.props;
    const field = this.getField();
    const labelNode = label ? <label>{label}</label> : null;

    return (
      <Wrapper error={field.error} required={required}>
        {labelNode}
        <input type="text"
               value={field.value}
               placeholder={placeholder}
               onChange={this.onChange}
               onBlur={this.setHasBeenTouched} />
      </Wrapper>
    );
  }
});

export default TextInput;
