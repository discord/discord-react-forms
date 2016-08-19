import React from 'react';
import {Form, Checkbox, RadioGroup} from '../../lib';

const radioGroupOptions = [
  {value: 'radio-group-1', label: 'Radio group 1'},
  {value: 'radio-group-2', label: 'Radio group 2'}
];

const CheckboxExample = () => (
  <Form submit={() => {}}>
    <Checkbox name="checkbox-1" label="Checkbox" />
    <Checkbox name="checkbox-2" label="On by default" value={true} />
    <RadioGroup name="radio-group-1" label="Radio group" options={radioGroupOptions} />
    <RadioGroup name="radio-group-2" label="Radio group with default value" options={radioGroupOptions}
      value="radio-group-2" />
  </Form>
);

export default CheckboxExample;
