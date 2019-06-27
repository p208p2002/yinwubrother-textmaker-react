import React from 'react';
import Script from 'react-load-script'

class Article extends React.Component {
    render() {
        return (
            <div>
                <div id="commento"></div>
                <Script
                    url="https://cdn.commento.io/js/commento.js"
                />
            </div>
        );
    }
}

export default Article
