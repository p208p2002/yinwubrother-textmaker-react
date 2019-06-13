import React, { Component } from 'react';
import './index.css'

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            yinwubrotherImgs: []
        }
    }

    componentDidMount() {
        let { yinwubrotherImgs = [] } = this.state
        let img, index = 0
        while (index !== -1) {
            try {
                img = require('../../yinwubrother-imgs/' + index + '.jpg');
                yinwubrotherImgs.push(img)
                index++
            }
            catch{
                index = -1
            }
        }
        this.setState({
            yinwubrotherImgs
        })
    }
    render() {
        let { yinwubrotherImgs } = this.state
        return (
            <div id="img-block">
                <div className="row">
                    {yinwubrotherImgs.map((imgPath) => {
                        return (
                            <div className="col-md-1 col-4 block-padding">
                                <img src={imgPath} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default View;