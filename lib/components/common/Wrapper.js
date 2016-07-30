import React, {PropTypes} from 'react';

const Wrapper = ({error, required, children}) => (
  <div className="form-component">
    {required ? <span className="is-required-star">* </span> : null}
    {children}
    {error ? <div className="error">{error}</div> : null}
  </div>
);

Wrapper.propTypes = {
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.any
};

export default Wrapper;
