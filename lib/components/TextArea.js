import React, {PropTypes} from 'react';
import FieldMixin from './common/FieldMixin';
import Wrapper from './common/Wrapper';

const TextArea = React.createClass({
  mixins: [FieldMixin],

  propTypes: {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    validator: PropTypes.func,
    value: PropTypes.string
  },

  getDefaultProps() {
    return {
      value: ''
    };
  },

  componentWillMount() {
    const {value} = this.props;
    this.initField({hasDefaultValue: value.length > 0});
  },

  onChange(e) {
    this.setField({value: e.target.value});
  },

  render() {
    const {label, required} = this.props;
    const field = this.getField();

    return (
      <Wrapper required={required} error={field.error} label={label}>
        <textarea value={field.value} onChange={this.onChange} onBlur={this.setHasBeenTouched} />
      </Wrapper>
    );
  }
});

export default TextArea;
