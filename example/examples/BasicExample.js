import React from 'react';
import {Form, TextInput, SubmitButton} from '../../lib';
import '../style.css';

const BasicExample = () => (
  <Form submit={submit}>
    <div className="row">
      <TextInput placeholder="Hello, World!" name="hello" />
      <TextInput placeholder="default value" value="This is a default value" name="hello2" />
    </div>
    <div className="row centered">
      <SubmitButton canSubmitText="Submit" cannotSubmitText="Cannot Submit" isSubmittingText="Submitting" />
    </div>
  </Form>
);

function submit(values, callback) {
  console.log('submitted: ', values);
  setTimeout(callback, 1000);
}

export default BasicExample;
