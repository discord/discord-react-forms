import React, {PropTypes} from 'react';

const Wrapper = ({error, required, children}) => (
  <div className="form-component">
    {required ? <div className="is-required-star">*</div> : null}
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
