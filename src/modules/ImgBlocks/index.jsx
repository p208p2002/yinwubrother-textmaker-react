import React, { Component } from 'react';
import './index.css'
import ImgMaker from '../ImgMaker/index.jsx'
import GifMaker from '../GifMaker/index.jsx'

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            yinwubrotherImgs: [],
            yinwubrotherGifs: [],
            selectImgPath: '',
            showMaker:false
        }
        this.imgOnClick = this.imgOnClick.bind(this)
        this.closeMaker = this.closeMaker.bind(this)
    }

    closeMaker(){
        this.setState({
            showMaker:false
        })
    }

    imgOnClick(e, imgpath) {
        // window.scrollTo(0, 0);
        // console.log(imgpath)
        this.setState({
            showMaker:true,
            selectImgPath: imgpath
        })
    }

    componentDidMount() {
        let { yinwubrotherImgs = [], yinwubrotherGifs = [] } = this.state
        let img, index = 0

        //load jpgs
        index = 0
        while (index !== -1) {
            try {
                img = require('../../../public/yinwubrother-imgs/jpg/' + index + '.jpg');
                yinwubrotherImgs.push(img)
                index++
            }
            catch{
                index = -1
            }
        }

        //load gifs
        index = 0
        while (index !== -1) {
            try {
                img = require('../../../public/yinwubrother-imgs/gif/' + index + '.gif');
                yinwubrotherGifs.push(img)
                index++
            }
            catch{
                index = -1
            }
        }

        this.setState({
            yinwubrotherImgs,
            loading: false
        })
    }

    render() {
        let { yinwubrotherImgs, yinwubrotherGifs, selectImgPath, showMaker } = this.state
        var re = /\.gif$/i;
        var match = selectImgPath.match(re)
        let gifResource = match ? true : false
        return (
            <div id="img-block">
                <h4 className="text-center">靜態圖集</h4>
                <hr />
                <div className="row row-width">
                    {yinwubrotherImgs.map((imgPath, index) => {
                        return (
                            <div className="col-md-1 col-4 block-padding" key={index}>
                                <img
                                    className="img"
                                    src={imgPath}
                                    alt=""
                                    onClick={(e) => this.imgOnClick(e, imgPath)}
                                />
                            </div>
                        )
                    })}
                </div>
                <br />
                <h4 className="text-center">動態圖集</h4>
                <hr />
                <div className="row row-width">
                    {yinwubrotherGifs.map((imgPath, index) => {
                        return (
                            <div className="col-md-1 col-4 block-padding" key={index}>
                                <img
                                    className="img"
                                    src={imgPath}
                                    alt=""
                                    onClick={(e) => this.imgOnClick(e, imgPath)}
                                />
                            </div>
                        )
                    })}
                </div>
                <div
                    className={showMaker?'float-window window-on':'float-window window-off'}
                    key={JSON.stringify(this.state)}
                >
                <div className="popup">
                    <button
                        className="close-popup btn btn-sm btn-danger"
                        onClick={this.closeMaker}>X</button>
                    <div>
                    {gifResource ?
                        <GifMaker
                            imgPath={selectImgPath}
                            key={selectImgPath + '1'}
                        />
                        :
                        <ImgMaker
                            imgPath={selectImgPath}
                            key={selectImgPath + '2'}
                        />
                    }
                </div>
                </div>
                </div>
            </div>
        );
    }
}

export default View;