import React from 'react';
import './App.css';
import ImgBlocks from './modules/ImgBlocks/index.jsx'
import DisqusBlock from './modules/Disqus/index.jsx'

class App extends React.Component {
  render() {
    return (
      <div id="App">
        <h1 className="text-center">鸚鵡兄弟文字圖產生器</h1>
        <hr/>
        <div className="container">
          <ImgBlocks/>
          <br/>
          <DisqusBlock/>
        </div>
        <hr/>
        <div className="text-center">
          <a href="https://github.com/p208p2002/yinwubrother-textmaker-react">GitHub</a>
          <br/>
          圖片皆來自Google
        </div>
        <br/>
      </div>
    );
  }
}

export default App;
