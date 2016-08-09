/* @flow */

import React, {PropTypes} from 'react';
import FieldMixin from './common/FieldMixin';

const HiddenField = React.createClass({
  mixins: [FieldMixin],

  propTypes: {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    render: PropTypes.bool
  },

  getDefaultProps() {
    return {
      render: false
    };
  },

  componentWillMount() {
    this.initField();
  },

  render() {
    if (!this.props.render) return null;

    return <input type="hidden" name={this.props.name} value={this.getValue()} ref={this.setRef} />;
  }
});

export default HiddenField;
