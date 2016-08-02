import React from 'react';
import ReactDOM from 'react-dom';
import BasicExample from './examples/BasicExample';
import ValidationExample from './examples/ValidationExample';
import ListeningExample from './examples/ListeningExample';

import './style.styl';

const Example = ({title, children}) => (
  <div className="example">
    <h2>{title}</h2>
    {children}
  </div>
);

const App = (
  <div className="container">
    <Example title="Basic Example"><BasicExample /></Example>
    <Example title="Validation Example"><ValidationExample /></Example>
    <Example title="Listening Example"><ListeningExample /></Example>
  </div>
);

ReactDOM.render(App, document.getElementById('app-mount'));
