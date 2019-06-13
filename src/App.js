import React from 'react';
import './App.css';
import ImgBlocks from './modules/ImgBlocks/index.jsx'

class App extends React.Component {
  render() {
    return (
      <div id="App">
        <h1 className="text-center">鸚鵡兄弟文字圖產生器</h1>
        <hr/>
        <div className="container">
          <ImgBlocks/>
        </div>
        <hr/>
        <div className="text-center">
          <a href="https://github.com/p208p2002/yinwubrother-textmaker-react" target="_blank">GitHub</a>
          <br/>
          圖片皆來自Google
        </div>
        <br/>
      </div>
    );
  }
}

export default App;
