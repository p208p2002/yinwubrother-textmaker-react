import React, { Component } from 'react';
import './index.css'
import ImgMaker from '../ImgMaker/index.jsx'

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            yinwubrotherImgs: [],
            showMaker: true,
            selectImgPath:''
        }
        this.imgOnClick = this.imgOnClick.bind(this)
    }

    imgOnClick(e,imgpath){
        window.scrollTo(0, 0);
        console.log(imgpath)
        // let {showMaker} = this.state
        this.setState({
            // showMaker:!showMaker,
            selectImgPath:imgpath
        })
    }

    componentDidMount() {
        let { yinwubrotherImgs = [] } = this.state
        let img, index = 0

        //load jpgs
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
        //

        this.setState({
            yinwubrotherImgs,
            loading:false
        })
    }
    render() {
        let { yinwubrotherImgs,showMaker,selectImgPath } = this.state
        return (
            <div id="img-block">
                {showMaker?
                    <div>
                        <ImgMaker
                            imgPath = {selectImgPath}
                        />
                    </div>
                    :
                    ''
                }
                <div className="row">
                    {yinwubrotherImgs.map((imgPath,index) => {
                        return (
                            <div className="col-md-1 col-4 block-padding" key={index}>
                                <img
                                    className="img"
                                    src={imgPath}
                                    alt=""
                                    onClick={(e)=>this.imgOnClick(e,imgPath)}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default View;