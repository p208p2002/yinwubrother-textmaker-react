import React, { Component } from 'react';
import './index.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');
const imgur = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/',
    timeout: 0,
    headers: { 'Authorization': 'Client-ID ea2c833b74d4583' }
});
// import AdSense from 'react-adsense';
var gifFrames = require('gif-frames');
// var fs = require('fs');

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontSize: 20,
            imgPath: props.imgPath,
            imgPathOri: props.imgPath,
            textInput: '',
            upLoadAble: false,
            showImgUploadLink: false,
            uploadImgLink: '',
            uploadStateText: '上傳並取得圖片連結',
            base64s: [], //gif frames with base64 format
            saveBase64s: [], //gif frames with base64 format and text,
            upInput:false
        }
        this.setFontSize = this.setFontSize.bind(this)
        // this.onImgLoad = this.onImgLoad.bind(this);
        this.makeText = this.makeText.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.upLoadImg = this.upLoadImg.bind(this)
        this.playGif = this.playGif.bind(this)
        this.makeGif = this.makeGif.bind(this)
        this.onBlurInput = this.onBlurInput.bind(this)
        this.inputKeyDown = this.inputKeyDown.bind(this)
    }

    inputKeyDown(e) {
        if (e.key === 'Enter') {
            e.target.blur()
            this.setState({
                imgPath: this.state.imgPathOri,
                upInput: false
            })
            let { textInput } = this.state
            setTimeout(() => {
                this.makeText(e, textInput)
            }, 0)
        }
    }


    onBlurInput() {
        setTimeout(() => {
            this.setState({
                upInput: false
            })
        }, 0)
    }

    makeGif(w, h) {
        toast.info('請耐心稍後，小夥伴努力上字中...', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
        // console.log('make')
        let { saveBase64s } = this.state
        let self = this
        gifshot.takeSnapShot({
            gifWidth: w,
            gifHeight: h,
            images: saveBase64s,
            interval: 0.1,
            numFrames: saveBase64s.length,
            frameDuration: 1,
            fontWeight: 'normal',
            fontSize: '16px',
            fontFamily: 'sans-serif',
            fontColor: '#ffffff',
            textAlign: 'center',
            textBaseline: 'bottom',
            sampleInterval: 10,
            numWorkers: 2
        }, function (obj) {
            if (!obj.error) {
                var image = obj.image;
                self.setState({
                    imgPath: image
                })
            }
        });
    }

    playGif(w, h) {
        console.log(w, h)
        let index = 0
        if (interval)
            clearInterval(interval)
        var interval = setInterval(() => {
            let { saveBase64s } = this.state
            let canvas = document.getElementById('play_gif')
            canvas.width = w
            canvas.height = h
            let ctx = canvas.getContext("2d");
            let img = new Image()
            img.src = saveBase64s[index]
            img.onload = () => {
                ctx.drawImage(img, 0, 0, w, h)
            }
            index++

            if (index === saveBase64s.length)
                index = 0
        }, 100)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            imgPath: nextProps.imgPath,
            imgPathOri: nextProps.imgPath,
            upLoadAble: false,
            showImgUploadLink: false,
            uploadImgLink: ''
        })

    }

    componentDidMount() {
        let self = this,
            { base64s, imgPath } = self.state
        if (imgPath === '')
            return
        gifFrames({
            url: imgPath,
            frames: 'all',
            outputType: 'canvas'
        })
            .then(function (frameData) {
                frameData.map(function (data) {
                    // console.log(data.getImage().toDataURL("image/png"))
                    base64s.push(data.getImage().toDataURL("image/png"))
                    return 0
                })
            })
            .catch(console.error.bind(console));

        // console.log(bas64s)
        self.setState({
            base64s
        })
    }

    upLoadImg() {
        let self = this
        let { imgPath: imgBase64 } = this.state
        imgBase64 = imgBase64.replace('data:image/gif;base64,', '')
        // console.log(imgBase64)
        this.setState({
            upLoadAble: false,
            uploadStateText: '上傳中...'
        })
        imgur.post('upload', {
            'image': imgBase64
        })
            .then(function (response) {
                // console.log(response);
                let { data = {} } = response.data,
                    { link = '' } = data
                console.log(data)
                console.log(link)
                self.setState({
                    showImgUploadLink: true,
                    uploadImgLink: link,
                    uploadStateText: '上傳並取得圖片連結'
                })
            })
            .catch(function (error) {
                console.log(error);
                self.setState({
                    upLoadAble: true,
                    uploadStateText: '上傳並取得圖片連結'
                })
            });
    }

    setFontSize(e, size) {
        console.log('size')
        this.setState({
            fontSize: size
        })
    }

    makeText(e, text) {
        if (text === '')
            return

        let selectImgH = 0, selectImgW = 0
        let { base64s } = this.state
        let self = this
        let saveBase64s = []
        let promiseCount = 0
        for (var i = 0; i < base64s.length; i++) {
            var base64 = base64s[i]
            let newImg = new Image()
            newImg.src = base64
            new Promise((resolve, reject) => {
                newImg.onload = () => {
                    selectImgH = newImg.naturalHeight
                    selectImgW = newImg.naturalWidth

                    var canvas = document.getElementById("output_gif");
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

                    //
                    ctx.fillText(addtext, text_w, text_h); //選擇位置 && 上字

                    //save to array
                    // console.log(canvas.toDataURL())
                    saveBase64s.push(canvas.toDataURL())

                    canvas.width = 0
                    canvas.height = 0
                    promiseCount++
                    return resolve()
                }
            })
                .then(() => {
                    // console.log(promiseCount, base64s.length)
                    //end of loop
                    if (promiseCount === base64s.length - 1) {

                        self.setState({
                            saveBase64s
                        })
                        // self.playGif(selectImgW, selectImgH)
                        self.makeGif(selectImgW, selectImgH)
                    }
                })


        }

        //允許上傳
        this.setState({
            upLoadAble: true
        })
    }

    handleChange(event) {
        this.setState({ textInput: event.target.value });
    }

    render() {
        let { imgPath = '', textInput, upLoadAble,
            showImgUploadLink, uploadImgLink, uploadStateText, upInput } = this.state
        if (window && window.innerWidth > 768) {
            upInput = false
        }
        return (
            <div key={JSON.stringify(this.props)}>
                <canvas
                    id="play_gif"
                    width="0" height="0"
                />
                <canvas
                    id="output_gif"
                    width="0" height="0"
                />

                {imgPath === '' ? '' :
                    <div id="img-maker" className="text-center">
                        <img
                            src={imgPath}
                            key={JSON.stringify(this.state) + JSON.stringify(this.props)}
                            alt='Select IMG'
                        />
                        <br />
                        <div className="row justify-content-center">
                            <div className="col-10 col-md-4">
                                <input
                                    className={upInput === true ? "form-control input-up" : "form-control"}
                                    type="text"
                                    value={this.state.textInput}
                                    onChange={this.handleChange}
                                    onClick={(e) => {
                                        this.setState({
                                            upInput: true
                                        })
                                    }}
                                    onBlur={this.onBlurInput}
                                    onKeyDown={this.inputKeyDown}
                                />
                            </div>
                        </div>
                        <div className="action-buttons">
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <button
                                    className="btn btn-info"
                                    onClick={(e) => {
                                        this.setState({
                                            imgPath: this.state.imgPathOri
                                        })
                                        setTimeout(() => {
                                            this.makeText(e, textInput)
                                        }, 0)
                                    }}>來人上字</button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        this.setState({
                                            imgPath: this.state.imgPathOri,
                                            textInput: '',
                                            upLoadAble: false,
                                            uploadImgLink: '',
                                            showImgUploadLink: false
                                        })
                                    }}>上錯字啦</button>
                                <a
                                    className="btn btn-success"
                                    href={imgPath}
                                    download={textInput === '' ? 'image.gif' : textInput + '.gif'}
                                >
                                    下載圖片
                                </a>
                            </div>
                            <br />
                            {/* 圖片上傳按鈕 */}
                            {uploadImgLink === '' ?
                                <button
                                    key={uploadStateText}
                                    className="btn btn-warning upload-btn"
                                    onClick={this.upLoadImg}
                                    disabled={!upLoadAble}
                                >{uploadStateText}</button>
                                :
                                ''
                            }
                            {/* 圖片上傳後連結 */}
                            {showImgUploadLink ?
                                <div className="row justify-content-center">
                                    <div className="col-10 col-md-4">
                                        <input
                                            style={{
                                                // marginTop: '-15px'
                                            }}
                                            className="form-control"
                                            type="text"
                                            value={uploadImgLink}
                                            onClick={(e) => {
                                                e.target.select();
                                                document.execCommand("copy");
                                                toast('連結已複製', {
                                                    position: "bottom-center",
                                                    autoClose: 2000,
                                                    hideProgressBar: true,
                                                    closeOnClick: true,
                                                    pauseOnHover: false,
                                                    draggable: true,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                :
                                ''}
                        </div>
                        <button
                            className="btn btn-sm btn-outline-info"
                            onClick={() => {
                                toast.info('如果在APP內置瀏覽器中下載圖片可能會被自動阻擋。試著"在瀏覽器中開啟"，或長按圖片來進行存檔', {
                                    position: "bottom-center",
                                    autoClose: 5000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                });

                            }}>無法下載圖片?</button>
                        <br />
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