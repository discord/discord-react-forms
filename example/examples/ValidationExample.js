import React from 'react';
import {Form, TextInput, SubmitButton, Validators} from '../../lib';
import '../style.css';

const ValidationExample = () => (
  <Form submit={submit}>
    <div className="row">
      <TextInput required
        name="must-fill-out"
        validator={Validators.isFilled('Fill this out!')}
        label="Fill this out" />
      <TextInput name="text" validator={validator} required label="Must be valid" intervalCheck={1000} />
    </div>
    <SubmitButton canSubmitText="Submit" cannotSubmitText="Cannot Submit" isSubmittingText="Submitting" />
  </Form>
);

function validator(name, {value}, _fields) {
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
