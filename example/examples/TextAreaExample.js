import React from 'react';
import {Form, TextArea} from '../../lib';

function validator(name, {value}) {
  if (value == 'bad') {
    return `that's a bad value`;
  }
}

const TextAreaExample = () => (
  <Form submit={() => {}}>
    <TextArea name="textarea" value="default value" label="Text area" required validator={validator} />
  </Form>
);

export default TextAreaExample;
