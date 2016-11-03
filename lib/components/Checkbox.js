/* @flow */

import React, {PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import FieldMixin from './common/FieldMixin';
import '../styles/Checkbox.css';

@ReactMixin.decorate(FieldMixin)
class Checkbox extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    value: PropTypes.bool
  };

  static defaultProps = {
    value: false
  };

  componentWillMount() {
    this.initField();
  }

  shouldComponentUpdate(_nextState, _nextProps, nextContext) {
    return this.shouldUpdate(nextContext);
  }

  onChange({target}: {target: HTMLInputElement}) {
    this.setField({value: target.checked});
  }

  toggleValue() {
    const field = this.getField();
    const value = !field.value;
    this.setField({value});
  }

  render() {
    const {name, label} = this.props;
    const field = this.getField();

    return (
      <div className="forms-checkbox">
        <input type="checkbox" onChange={::this.onChange} checked={field.value} name={name} ref={::this.setRef} />
        <label onClick={::this.toggleValue}>{label}</label>
      </div>
    );
  }
}

export default Checkbox;
