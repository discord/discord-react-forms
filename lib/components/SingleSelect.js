import React, {PropTypes} from 'react';
import FieldMixin from './common/FieldMixin';
import Wrapper from './common/Wrapper';

const SingleSelect = React.createClass({
  mixins: [FieldMixin],

  propTypes: {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    validator: PropTypes.func,
    value: PropTypes.string
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
    else if (options[0]) {
      defaultValue = options[0].value;
    }

    this.initField({value: defaultValue});
  },

  onChange(e) {
    this.setField({value: e.target.value});
  },

  render() {
    const {label, placeholder, required} = this.props;
    const field = this.getField();

    const options = this.props.options.map((option, i) => {
      const label = option.label ? option.label : option.value;
      return (
        <option key={`option-${i}`} value={option.value}>{label}</option>
      );
    });

    const placeholderNode = placeholder ? <option disabled>{placeholder}</option> : null;

    return (
      <Wrapper error={field.error} required={required} label={label}>
        <select onChange={this.onChange} value={field.value}>
          {placeholderNode}
          {options}
        </select>
      </Wrapper>
    );
  }
});

export default SingleSelect;
