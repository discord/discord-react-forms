import React from 'react';
import {Form, SingleSelect} from '../../lib';

const options = [
  {
    value: 'option-1',
    label: 'Option 1'
  },
  {
    value: 'option-2',
    label: 'Option 2'
  },
  {
    value: 'option-3'
  },
];

const SingleSelectExample = () => (
  <Form submit={() => {}}>
    <SingleSelect name="single-select" options={options} label="Single Select" />
    <SingleSelect name="single-select-placeholder" options={options} label="Single Select" placeholder="placeholder" />
  </Form>
);

export default SingleSelectExample;
