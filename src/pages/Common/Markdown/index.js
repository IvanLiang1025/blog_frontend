
import * as React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import hljs from 'highlight.js';

import 'highlight.js/styles/atom-one-dark.css';
// import 'highlight.js/styles/atom-one-light.css'
import { apiUpload } from '@/services/requestApi';

const PLUGINS = undefined;
// const PLUGINS = ['header', 'image', 'full-screen'];

// MdEditor.use(Plugins.AutoResize, {
//   min: 200,
//   max: 800
// });

// MdEditor.use(Plugins.TabInsert, {
//   tabMapValue: 1, // note that 1 means a '\t' instead of ' '.
// });



class MarkDown extends React.Component {
  

  constructor(props) {
    super(props);
    this.renderHTML = this.renderHTML.bind(this);
    this.mdEditor = MdEditor;
    const { value } = props;
    // initial a parser
    this.mdParser = new MarkdownIt({
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


    

    // this.state = {
    //   value: value,
    // };
  }

  handleEditorChange = (it) => {
    // console.log(it);
    // console.log('handleEditorChange', it.text, it.html);
    const { handleContentChange } = this.props;
    // console.log()
    // this.setState({
    //   value: it.text,
    // });

    if (handleContentChange) handleContentChange(it.text);


  };

  handleImageUpload = (file) => {
    // console.log(file);
    const formData = new FormData();
    formData.append("uploadFile", file);
    // console.log("uploading file=========")

    return apiUpload("/upload", formData);
    // console.log(response);


    // return new Promise(resolve => {
    //   const reader = new FileReader();
    //   reader.onload = data => {
    //     // @ts-ignore
    //     resolve(data.target.result);
    //   };
    //   reader.readAsDataURL(file);
    // });
  };

  onCustomImageUpload = (event) => {
    console.log('onCustomImageUpload', event);
    return new Promise((resolve, reject) => {
      const result = window.prompt('Please enter image url here...');
      resolve({ url: result });
      // custom confirm message pseudo code
      // YourCustomDialog.open(() => {
      //   setTimeout(() => {
      //     // setTimeout ??????oss??????????????????
      //     // ???oss??????????????????????????????????????????calback??????????????????imageUrl??????????????????????????????????????????markdown
      //     const url = 'https://avatars0.githubusercontent.com/u/21263805?s=80&v=4'
      //     resolve({url: url, name: 'pic'})
      //   }, 1000)
      // })
    });
  };

  // handleGetMdValue = () => {
  //   if (this.mdEditor) {
  //     alert(this.mdEditor.getMdValue());
  //   }
  // };

  // handleGetHtmlValue = () => {
  //   if (this.mdEditor) {
  //     alert(this.mdEditor.getHtmlValue());
  //   }
  // };

  // handleSetValue = () => {
  //   const text = window.prompt('Content');
  //   this.setState({
  //     value: text,
  //   });
  // };

  renderHTML(text) {
    return this.mdParser.render(text);
    // Using react-markdown
    // return React.createElement(ReactMarkdown, {
    //   source: text,
    // });
  }

  render() {
    // console.log('===markdown===');
    // console.log(this.state.value)
    const { value } = this.props;
    // console.log(value)
    return (
      <div className="demo-wrap">
        {/* <h3>react-markdown-editor-lite demo</h3> */}
        {/* <nav className="nav">
          <button onClick={this.handleGetMdValue}>getMdValue</button>
          <button onClick={this.handleGetHtmlValue}>getHtmlValue</button>
          <button onClick={this.handleSetValue}>setValue</button>
        </nav> */}
        <div className="editor-wrap">
          <MdEditor
            ref={node => (this.mdEditor = node || undefined)}
            value={value}
            style={{ minHeight: '500px', width: '100%' }}
            renderHTML={this.renderHTML}
            plugins={PLUGINS}
            config={{
              view: {
                menu: true,
                md: true,
                html: true,
                fullScreen: true,
                hideMenu: true,
              },
              table: {
                maxRow: 5,
                maxCol: 6,
              },
              // imageUrl: 'https://octodex.github.com/images/minion.png',
              syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
            }}
            onChange={this.handleEditorChange}
            onImageUpload={this.handleImageUpload}
          
            // onCustomImageUpload={this.onCustomImageUpload}
          />
        </div>
        {/* <div style={{marginTop: '30px'}}>
          <MdEditor
            value={MOCK_DATA}
            style={{height: '200px', width: '100%'}}
            config={{
              view: {
                menu: true,
                md: true,
                html: true
              },
              imageUrl: 'https://octodex.github.com/images/minion.png'
            }}
            onChange={this.handleEditorChange} 
          />  
        </div> */}
      </div>
    );
  }
}

// ReactDOM.render(<Demo />, document.getElementById('app'));

export default MarkDown;