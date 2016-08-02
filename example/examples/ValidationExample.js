import React from 'react';
import {Form, TextInput, SubmitButton} from '../../lib';

const ValidationExample = () => (
  <Form submit={submit}>
    <TextInput name="text" validator={validator} required label="Must be valid" />
    <SubmitButton canSubmitText="Submit" cannotSubmitText="Cannot Submit" isSubmittingText="Submitting" />
  </Form>
);

function validator(name, {value}) {
  if (!value.length) {
    return 'Yo, fill this out';
  }
  else if (value == 'bad') {
    return 'That value is no good';
  }
}

function submit(values, callback) {
  setTimeout(() => {
    if (values.text != 'good') {
      callback({text: 'Oh no! Something bad happened on the server'});
    }
    else {
      callback();
    }
  }, 1000);
}

export default ValidationExample;
