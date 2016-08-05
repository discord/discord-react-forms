import React, {PropTypes} from 'react';
import FieldMixin from './common/FieldMixin';

const HiddenField = React.createClass({
  mixins: [FieldMixin],

  PropTypes: {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
  },

  componentWillMount() {
    this.initField();
  },

  render() {
    return null;
  }
});

export default HiddenField;


