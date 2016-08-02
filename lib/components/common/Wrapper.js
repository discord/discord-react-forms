import React, {PropTypes} from 'react';

const Wrapper = ({error, required, children, label}) => (
  <div className="form-component">
    {required ? <span className="is-required-star">* </span> : null}
    {label ? <label>{label}</label> : null}
    {children}
    {error ? <div className="error">{error}</div> : null}
  </div>
);

Wrapper.propTypes = {
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.any,
  label: PropTypes.string
};

export default Wrapper;
