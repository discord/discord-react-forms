import React from 'react';
import {Form, HiddenField, SubmitButton} from '../../lib';

const HiddenExample = React.createClass({
  submit(values, callback) {
    console.log(values);
    callback();
  },

  render() {
    return (
      <Form submit={this.submit}>
        <div>Open the console and submit this form</div>
        <HiddenField value="I'm hidden" name="hidden" />
        <HiddenField value="I'm hidden, but rendered" name="hidden-rendered" render />
        <SubmitButton canSubmitText="Submit" cannotSubmitText="Can't Submit" submittingText="Submitting" />
      </Form>
    );
  }
});

export default HiddenExample;
