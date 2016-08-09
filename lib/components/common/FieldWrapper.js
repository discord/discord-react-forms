/* @flow */

import React, {PropTypes} from 'react';
import styles from '../../styles/common/FieldWrapper.css';

type FieldWrapperType = {
  error: string;
  required: boolean;
  children?: any;
  label: ?string;
};

const FieldWrapper = ({error, displayError, required, children, label}: FieldWrapperType) => (
  <div className={styles.field}>
    {required || label ?
      <div className={styles.requiredLabelWrapper}>
        {required ? <span className={styles.requiredStar}>* </span> : null}
        {label ? <label className={styles.label}>{label}</label> : null}
      </div> :
      null
    }
    {children}
    {error && displayError ? <div className={styles.error}>{error}</div> : null}
  </div>
);

FieldWrapper.propTypes = {
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.any,
  label: PropTypes.string
};

export default FieldWrapper;
