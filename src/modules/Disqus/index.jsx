import React from 'react';
import Disqus from 'disqus-react';
// Alternatively, import specific members:
// import { DiscussionEmbed, CommentCount } from 'disqus-react';

class Article extends React.Component {
    render() {
        const disqusShortname = 'example';
        const disqusConfig = {
            url: process.env.PUBLIC_URL,
            identifier: process.env.PUBLIC_URL,
            title: process.env.PUBLIC_URL,
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