// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

import Panel from './components/Panel/Panel';
import Field from './components/Field/Field';

function App() {
  const [isSelectable, setIsSelectable] = useState(false);
  return (
    <div className="App">
      <Panel
        setIsSelectable={setIsSelectable}
      />
      <Field
        isSelectable={isSelectable}
        setIsSelectable={setIsSelectable}
      />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
