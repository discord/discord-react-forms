import React, {PropTypes} from 'react';

const Wrapper = ({error, required, children, label}) => (
  <div className="form-component">
    {required ? <span className="form-required-star">* </span> : null}
    {label ? <label className="form-label">{label}</label> : null}
    {children}
    {error ? <div className="form-error">{error}</div> : null}
  </div>
);

Wrapper.propTypes = {
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.any,
  label: PropTypes.string
};

export default Wrapper;
