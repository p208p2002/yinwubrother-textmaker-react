import React from 'react';
import './App.css';
import ImgBlocks from './modules/ImgBlocks/index.jsx'
import DisqusBlock from './modules/Disqus/index.jsx'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LineShareButton,
  LineIcon,
} from 'react-share';
// import AdSense from 'react-adsense';

var SHARE_URL = 'https://p208p2002.github.io/yinwubrother-textmaker-react/'
class App extends React.Component {
  render() {
    return (
      <div id="App">
        <div className="text-center">
          <h1>鸚鵡兄弟文字圖產生器</h1>
          <div className="icon-align">
          <FacebookShareButton
            url={SHARE_URL}
          >
          <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>
          <LineShareButton
            url={SHARE_URL}
          >
          <LineIcon
              size={32}
              round />
          </LineShareButton>
          <TwitterShareButton
            url={SHARE_URL}
          >
          <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>
          <WhatsappShareButton
            url={SHARE_URL}
          >
          <WhatsappIcon
              size={32}
              round />
          </WhatsappShareButton>
          </div>
        </div>
        <div className="text-center"><small>share links</small></div>
        <hr/>
        <div className="container">
          <ImgBlocks/>
          <br/>
          {/* <AdSense.Google
            client='ca-pub-3857728160074264'
            slot='5604826184'
            responsive="true"
          /> */}
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
