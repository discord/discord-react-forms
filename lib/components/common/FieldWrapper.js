/* @flow */

import React, {PropTypes} from 'react';
import '../../styles/common/FieldWrapper.css';

type FieldWrapperType = {
  error: string | ReactClass<any>;
  required: boolean;
  children?: any;
  label: ?string;
};

const FieldWrapper = ({error, displayError, required, label, className, children, ...rest}: FieldWrapperType) => (
  <div className={`forms-field ${className}`} {...rest}>
    {required || label ?
      <div className="forms-required-label-wrapper">
        {required ? <span className="forms-required-star">* </span> : null}
        {label ? <label className="forms-label">{label}</label> : null}
      </div> :
      null
    }
    {children}
    {error && displayError ? <div className="forms-error">{error}</div> : null}
  </div>
);

FieldWrapper.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  required: PropTypes.bool,
  children: PropTypes.any,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default FieldWrapper;
