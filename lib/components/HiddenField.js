/* @flow */

import React, {PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import FieldMixin from './common/FieldMixin';

@ReactMixin.decorate(FieldMixin)
class HiddenField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    render: PropTypes.bool
  };

  static defaultProps = {
    render: false
  };

  componentWillMount() {
    this.initField();
  }

  render() {
    if (!this.props.render) return null;

    return <input type="hidden" name={this.props.name} value={this.getValue()} ref={::this.setRef} />;
  }
}

export default HiddenField;
