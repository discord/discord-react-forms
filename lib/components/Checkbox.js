/* @flow */

import React, {PropTypes} from 'react';
import FieldMixin from './common/FieldMixin';

const Checkbox = React.createClass({
  mixins: [FieldMixin],

  propTypes: {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.bool
  },

  getDefaultProps() {
    return {
      value: false
    };
  },

  componentWillMount() {
    this.initField();
  },

  onChange({target}: {target: HTMLInputElement}) {
    this.setField({value: target.checked});
  },

  toggleValue() {
    const field = this.getField();
    const value = !field.value;
    this.setField({value});
  },

  render() {
    const field = this.getField();

    return (
      <div>
        <input type="checkbox" onChange={this.onChange} checked={field.value} />
        <label onClick={this.toggleValue}>{this.props.label}</label>
      </div>
    );
  }
});

export default Checkbox;
