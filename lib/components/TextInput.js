import React, {PropTypes} from 'react';
import Wrapper from './common/Wrapper';
import {ContextTypes} from '../Constants';

const TextInput = React.createClass({
  propTypes: {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.any,
    required: PropTypes.bool,
    validator: PropTypes.func,
    value: PropTypes.any
  },

  contextTypes: ContextTypes,

  getDefaultProps() {
    return {
      placeholder: '',
      value: ''
    };
  },

  componentWillMount() {
    const {name, value, validator, required} = this.props;
    this.context.initValue({name, value, validator, required, hasDefaultValue: value && value.length});
  },

  getField() {
    return this.context.getField(this.props.name);
  },

  onChange(e) {
    const {name} = this.props;
    const {setValue} = this.context;

    setValue({
      name,
      value: e.target.value
    });
  },

  // TODO: Mixin?
  onBlur() {
    this.context.setHasBeenTouched(this.props.name);
  },

  // TODO: Mixin?
  getRef(_node) {
    this._node = _node;
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
               onBlur={this.onBlur}
               ref={this.getRef} />
      </Wrapper>
    );
  }
});

export default TextInput;
