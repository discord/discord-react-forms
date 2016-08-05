/* @flow */

import React, {PropTypes} from 'react';
import FieldMixin from './common/FieldMixin';

const HiddenField = React.createClass({
  mixins: [FieldMixin],

  propTypes: {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    shouldRender: PropTypes.bool
  },

  getDefaultProps() {
    return {
      shouldRender: false
    };
  },

  componentWillMount() {
    this.initField();
  },

  render() {
    if (!this.props.shouldRender) return null;

    return <input type="hidden" name={this.props.name} value={this.props.value} />
  }
});

export default HiddenField;
