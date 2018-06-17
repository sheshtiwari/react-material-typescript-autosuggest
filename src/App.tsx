import * as React from 'react';

import './App.css';
import CreateMetaData from './components/create-metadata';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <CreateMetaData />
      </div>
    );
  }
}

export default App;
