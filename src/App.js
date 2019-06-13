import React from 'react';
import './App.css';
import ImgBlocks from './modules/ImgBlocks/index.jsx'

class App extends React.Component {
  render() {
    return (
      <div id="App">
        <h1 className="text-center">鸚鵡兄弟圖文產生器</h1>
        <hr/>
        <div className="container">
          <ImgBlocks/>
        </div>
      </div>
    );
  }
}

export default App;
