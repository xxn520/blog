/**
 * Created by m2mbob on 2017/4/16.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import highlightJs from 'highlight.js'

import './github-markdown.css'

const styles = {
    root: {
        marginTop: 20,
        marginBottom: 20,
        padding: '0 10px',
    },
};

export default class MarkdownElement extends PureComponent {

    static propTypes = {
        style: PropTypes.object,
        text: PropTypes.string.isRequired,
    };

    static defaultProps = {
        text: '',
    };

    componentWillMount() {
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function(code, lang) {
                return highlightJs.highlight(lang, code).value;
            },
        });
    }

    render() {
        const {
            style,
            text,
        } = this.props;

        return (
            <div
                style={Object.assign({}, styles.root, style)}
                className="markdown-body"
                dangerouslySetInnerHTML={{__html: marked(text)}}
            />
        );
    }
}
