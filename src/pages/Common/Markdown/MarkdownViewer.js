import React, { Fragment } from "react";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

import 'highlight.js/styles/atom-one-dark.css';
import 'github-markdown-css';
import "./index.css"


const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight(str, lang) {

        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>` +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) { }
        }

        return '<pre class="hljs"><code>' + "" + '</code></pre>';

    },
});

class MarkdownViewer extends React.Component {

    constructor(props) {
        super(props);
        // this.mdParser = new MarkdownIt({
        //     html: true,
        //     linkify: true,
        //     typographer: true,
        //     highlight(str, lang) {

        //         if (lang && hljs.getLanguage(lang)) {
        //             try {
        //                 return `<pre class="hljs"><code>` +
        //                     hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
        //                     '</code></pre>';
        //             } catch (__) { }
        //         }

        //         return '<pre class="hljs"><code>' + "" + '</code></pre>';

        //     },
        // });
    }

    render() {

        const { content } = this.props;

        // const a = "#### hello";
        // const b = this.mdParser.render(content);
        // console.log(b)

        return (
            <div className={"markdown-body md-body"}>
                <div dangerouslySetInnerHTML={{ __html: mdParser.render(content) }}>
                </div>
            </div>
        )
    }
}

export default MarkdownViewer;