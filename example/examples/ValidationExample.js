import React from 'react';
import {Form, TextInput, SubmitButton} from '../../lib';

const ValidationExample = () => (
  <Form>
    <TextInput name="text" validator={validator} required />
    <SubmitButton canSubmitText="Submit" cannotSubmitText="Cannot Submit" isSubmittingText="Submitting" />
  </Form>
);

function validator({field}) {
  const {value} = field;
  if (!value.length) {
    return 'Yo, fill this out';
  }
  else if (value == 'bad') {
    return 'That value is no good';
  }
}

export default ValidationExample;
