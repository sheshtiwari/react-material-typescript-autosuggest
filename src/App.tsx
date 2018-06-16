import * as React from 'react';

import './App.css';
import CreateMetaData from './components/create-metadata';
const appStyles = {
  title: {
    color: '#666',
    fontSize: 24
  }
};

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div style={appStyles.title}>
          <p>React Typescript Material-UI Autosuggest</p>
          <CreateMetaData />
        </div>
      </div>
    );
  }
}

export default App;
