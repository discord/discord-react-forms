import React from 'react';
import {Form, TextInput, SubmitButton} from '../../lib';

const ListeningExample = React.createClass({
  getInitialState() {
    return {
      name: '',
      value: ''
    };
  },

  onUpdate(name, field) {
    this.setState({name: name, value: field.value});
  },

  submit() {
  },

  render() {
    const {name, value} = this.state;
    return (
        <Form onFieldUpdate={this.onUpdate} submit={this.submit}>
          <div>Last edited {name} with value '{value}'</div>
          <TextInput name="field-1" />
          <TextInput name="field-2" />
        </Form>
    );
  }
});

export default ListeningExample;
