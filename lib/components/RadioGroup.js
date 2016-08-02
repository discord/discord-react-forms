import React, {PropTypes} from 'react';
import FieldMixin from './common/FieldMixin';
import Wrapper from './common/Wrapper';

const RadioGroup = React.createClass({
  mixins: [FieldMixin],

  propTypes: {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.array,
    required: PropTypes.bool,
    validator: PropTypes.func,
    value: PropTypes.string
  },

  getDefaultProps() {
    return {
      value: '',
      options: []
    };
  },

  componentWillMount() {
    this.initField();
  },

  onChange(value) {
    this.setField({value});
  },

  render() {
    const {options, label, required} = this.props;
    const field = this.getField();

    const radios = options.map((option, i) => {
      const onChange = this.onChange.bind(null, option.value);
      return (
        <div key={`radio-option-${i}`}>
          <input type="radio" checked={field.value == option.value} onChange={onChange} />
          <label onClick={onChange}>{option.label}</label>
        </div>
      );
    });

    return (
      <Wrapper error={field.error} required={required} label={label}>
        {radios}
      </Wrapper>
    );
  }
});

export default RadioGroup;
