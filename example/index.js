import React from 'react';
import ReactDOM from 'react-dom';
import BasicExample from './examples/BasicExample';
import ValidationExample from './examples/ValidationExample';
import ListeningExample from './examples/ListeningExample';
import CheckboxExample from './examples/CheckboxExample';
import HiddenExample from './examples/HiddenExample';
import SingleSelectExample from './examples/SingleSelectExample';
import TextAreaExample from './examples/TextAreaExample';
import BigFormExample from './examples/BigFormExample';
import './style.css';

const Example = ({title, children}) => (
  <div className="example">
    <h2>{title}</h2>
    {children}
  </div>
);

const App = (
  <div>
    <Example title="Basic Example"><BasicExample /></Example>
    <Example title="Validation Example"><ValidationExample /></Example>
    <Example title="Listening Example"><ListeningExample /></Example>
    <Example title="Checkbox Example"><CheckboxExample /></Example>
    <Example title="Hidden Example"><HiddenExample /></Example>
    <Example title="Single Select Example"><SingleSelectExample /></Example>
    <Example title="TextArea Example"><TextAreaExample /></Example>
    <Example title="Big Form Example"><BigFormExample /></Example>
  </div>
);

ReactDOM.render(App, document.getElementById('app-mount'));
