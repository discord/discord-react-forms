import React from 'react';
import {Form, TextInput, SubmitButton} from '../../lib';
import '../style.css';

const textInputs = [];
for (let i = 0; i < 100; i++) {
  textInputs.push(<TextInput name={`input-${i}`} value={`default value ${i}`} key={`input-${i}`} />);
}

const BigFormExample = () => (
  <Form submit={submit}>
    <div className="scroller">
      {textInputs}
    </div>

    <SubmitButton canSubmitText="Submit" cannotSubmitText="Cannot Submit" isSubmittingText="Submitting" />
  </Form>
);

function submit(values, callback) {
  console.log('submitted: ', values);
  setTimeout(callback, 1000);
}

export default BigFormExample;
