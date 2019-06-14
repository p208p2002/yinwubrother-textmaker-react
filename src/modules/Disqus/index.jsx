import React from 'react';
import Disqus from 'disqus-react';
// Alternatively, import specific members:
// import { DiscussionEmbed, CommentCount } from 'disqus-react';

class Article extends React.Component {
    render() {
        const disqusShortname = '鸚鵡兄弟文字圖產生器';
        const disqusConfig = {
            url: 'https://p208p2002.github.io/yinwubrother-textmaker-react/',
            identifier: 'https://p208p2002.github.io/yinwubrother-textmaker-react/',
            title: 'https://p208p2002.github.io/yinwubrother-textmaker-react/',
        };

        return (
            <div className="article">
                {/* <h1>{this.props.article.title}</h1> */}
                <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
                    Comments
                </Disqus.CommentCount>
                {/* <p>{this.props.article.body}</p> */}
                <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
            </div>
        );
    }
}

export default Article