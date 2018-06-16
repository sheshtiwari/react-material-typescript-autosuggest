import * as React from 'react';

import './App.css';
import CreateMetaData from './components/create-metadata';
const appStyles = {
  title: {
    color: '#1D1D1B',
    fontSize: 24
  }
};

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div style={appStyles.title}>
          <CreateMetaData />
        </div>
      </div>
    );
  }
}

export default App;
