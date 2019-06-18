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
import { ToastContainer, toast } from 'react-toastify';
// import AdSense from 'react-adsense';

var SHARE_URL = 'https://p208p2002.github.io/yinwubrother-textmaker-react/'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: 'default'
    }
    this.changeStyle = this.changeStyle.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.setCookie = this.setCookie.bind(this)
  }

  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (parseInt(c.indexOf(name)) === 0) return c.substring(name.length, c.length);
    }
    return "";
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  componentDidMount() {
    let style = this.getCookie('theme')
    if(style === ''){
      style = 'default'
    }
    this.setState({
      style
    })

    toast.info('鸚鵡兄弟動起來啦~動圖功能上線🎉🎉', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
  });
  }

  changeStyle() {
    let { style } = this.state
    if (style === 'default')
      style = 'classic'
    else
      style = 'default'

    this.setCookie('theme',style,365)
    this.setState({
      style
    })
    toast('設定已儲存', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
  });
  }

  render() {
    let { style } = this.state
    return (
      <div id="App" className={style === 'default' ? '' : 'bg-black text-white'}>
        <ToastContainer />
        <div className={style === 'default' ? 'container' : 'container content-dark'}>
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
          <hr />

          <ImgBlocks />
          <br />
          {/* <AdSense.Google
            client='ca-pub-3857728160074264'
            slot='5604826184'
            responsive="true"
          /> */}
          <br />
          <DisqusBlock />

          <hr />
          <div className="text-center footer">
            <a
              className="btn btn-sm btn-outline-primary"
              href="https://github.com/p208p2002/yinwubrother-textmaker-react">GitHub</a>
            <button
              className={style === 'default' ? 'btn btn-sm btn-outline-secondary' : 'btn btn-sm btn-outline-light'}
              onClick={this.changeStyle}>切換主題:{style.charAt(0).toUpperCase() + style.slice(1)}</button>
            <br />
            圖片皆來自Google
        </div>
          <br />

        </div>
      </div>
    );
  }
}

export default App;
