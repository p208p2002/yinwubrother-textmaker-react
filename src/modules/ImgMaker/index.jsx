import React, { Component } from 'react';
import './index.css'
const axios = require('axios');
const imgur = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/',
    timeout: 0,
    headers: { 'Authorization': 'Client-ID ea2c833b74d4583' }
});
// import AdSense from 'react-adsense';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontSize: 20,
            selectImgW: 0,
            selectImgH: 0,
            imgPath: props.imgPath,
            imgPathOri: props.imgPath,
            textInput: '',
            upLoadAble:false,
            showImgUploadLink:false,
            uploadImgLink:''
        }
        this.setFontSize = this.setFontSize.bind(this)
        // this.onImgLoad = this.onImgLoad.bind(this);
        this.makeText = this.makeText.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.upLoadImg = this.upLoadImg.bind(this)
    }

    upLoadImg() {
        let self = this
        let { imgPath: imgBase64 } = this.state
        imgBase64 = imgBase64.replace('data:image/png;base64,','')
        // console.log(imgBase64)
        this.setState({
            upLoadAble:false
        })
        imgur.post('upload', {
            'image': imgBase64
        })
            .then(function (response) {
                // console.log(response);
                let {data={}} = response.data,
                {link=''} = data
                console.log(data)
                console.log(link)
                self.setState({
                    showImgUploadLink:true,
                    uploadImgLink:link
                })
            })
            .catch(function (error) {
                console.log(error);
                self.setState({
                    upLoadAble:true
                })
            });
    }

    setFontSize(e, size) {
        console.log('size')
        this.setState({
            fontSize: size
        })
    }

    // onImgLoad({ target: img }) {
        // console.log('img', img)
        // console.log('src', img.src)
        // console.log(img.naturalWidth, img.naturalHeight)
        // this.setState({
            // selectImgH: img.naturalHeight,
            // selectImgW: img.naturalWidth,
        // })
    // }

    makeText(e, text) {
        // console.log('click')
        // let { selectImgH, selectImgW } = this.state
        let selectImgH = 0, selectImgW = 0
        let { imgPath } = this.state

        let newImg = new Image()
        newImg.src = imgPath
        selectImgH = newImg.naturalHeight
        selectImgW = newImg.naturalWidth
        var canvas = document.getElementById("output");
        var ctx = canvas.getContext("2d");
        canvas.width = selectImgW
        canvas.height = selectImgH

        ctx.drawImage(newImg, 0, 0, selectImgW, selectImgH);
        ctx.fillStyle = "rgba(252,255,255,1)";

        //
        let addtext = text
        var w = canvas.width;
        var h = canvas.height;

        var text_w, text_h, text_l, text_fs
        text_l = addtext.length; //輸入長度
        text_fs = w / (text_l + 2);  //字體大小修正
        text_h = h * 0.95;		//離圖片底部的高度

        ctx.font = text_fs + "px  Microsoft YaHei";//即時修正字體大小
        var lenn
        lenn = ctx.measureText(addtext); //取得字的寬度
        text_w = (w - lenn.width) / 2; //0908寬度算法

        if (0) {
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 10;
            ctx.strokeText(addtext, text_w, text_h);
        }

        ctx.fillText(addtext, text_w, text_h); //選擇位置 && 上字
        // console.log(canvas.toDataURL())
        // document.getElementById("DL").href=dl_link;
        this.setState({
            imgPath: canvas.toDataURL()
        })
        canvas.width = 0
        canvas.height = 0
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log('recv', nextProps)
        this.setState({
            imgPath: nextProps.imgPath,
            imgPathOri: nextProps.imgPath,
            upLoadAble:false,
            showImgUploadLink:false
        })

    }

    handleChange(event) {
        this.setState({ textInput: event.target.value });
    }

    render() {
        let { selectImgH = 0, selectImgW = 0, imgPath = '',
        textInput, upLoadAble, showImgUploadLink, uploadImgLink } = this.state
        console.log(selectImgH, selectImgW)
        return (
            <div key={JSON.stringify(this.props)}>
                <canvas
                    id="output"
                    // key={JSON.stringify(this.state)+ JSON.stringify(this.props)}
                    width="0" height="0"
                />
                {imgPath === '' ? '' :
                    <div id="img-maker" className="text-center">
                        <img
                            // onLoad={this.onImgLoad}
                            src={imgPath}
                            key={JSON.stringify(this.state) + JSON.stringify(this.props)}
                            alt='Select IMG'
                        />
                        <br />
                        <div className="row justify-content-center">
                            <div className="col-10 col-md-4">
                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.textInput}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <button
                            className="btn btn-info"
                            onClick={(e) => {
                                this.setState({
                                    imgPath: this.state.imgPathOri
                                })
                                setTimeout(() => {
                                    this.makeText(e, textInput)
                                    this.setState({
                                        upLoadAble:true
                                    })
                                }, 0)
                            }}>來人上字</button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                this.setState({
                                    imgPath: this.state.imgPathOri,
                                    textInput: ''
                                })
                            }}>上錯字啦</button>
                        <a
                            className="btn btn-success"
                            href={imgPath}
                            download
                        >
                            下載圖片
                        </a>
                        <br />
                        <button
                            className="btn btn-warning"
                            onClick={this.upLoadImg}
                            disabled={!upLoadAble}
                            >取得圖片連結</button>
                        <br/>
                        {showImgUploadLink?
                        <div className="row justify-content-center">
                        <div className="col-10 col-md-4">
                            <input
                                className="form-control"
                                type="text"
                                value={uploadImgLink}
                                onClick={(e)=>{
                                    e.target.select();
                                    document.execCommand("copy");
                                    alert("連結已複製");
                                }}
                            />
                        </div>
                    </div>
                            :
                        ''}
                        <small>※在FB、Dcard等APP內置瀏覽器中開啟可能會無法正常下載圖片</small>
                        {/* <AdSense.Google
                            client='ca-pub-3857728160074264'
                            slot='7831127442'
                        /> */}
                    </div>

                }
                <br />
            </div>
        );
    }
}

export default Index;