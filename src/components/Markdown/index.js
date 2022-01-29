// import * as MarkdownIt from 'markdown-it';
import * as React from 'react';
// import * as ReactMarkdown from 'react-markdown';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
// import './index.less';

// const MOCK_DATA = content;

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
  // mdEditor?: MdEditor = undefined;

  // mdParser: MarkdownIt;
  

  constructor(props) {
    super(props);
    this.renderHTML = this.renderHTML.bind(this);
    this.mdEditor = MdEditor;
    const {value} = props;
    // initial a parser
    this.mdParser = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight(str, lang) {
        
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (__) {}
        }
        return '' // use external default escaping
        
      },
    });

    this.state = {
      value: value,
    };
  }

  handleEditorChange = (it) => {
    
    const {handleContentChange} = this.props;
    this.setState({
      value: it.text,
    });

    handleContentChange(it.text);
    
    
  };


  handleGetMdValue = () => {
    if (this.mdEditor) {
      alert(this.mdEditor.getMdValue());
    }
  };

  handleGetHtmlValue = () => {
    if (this.mdEditor) {
      alert(this.mdEditor.getHtmlValue());
    }
  };

  handleSetValue = () => {
    const text = window.prompt('Content');
    this.setState({
      value: text,
    });
  };

  renderHTML(text) {
    return this.mdParser.render(text);
    // Using react-markdown
    // return React.createElement(ReactMarkdown, {
    //   source: text,
    // });
  }

  render() {
    return (
      <div className="demo-wrap">
        {/* <h3>react-markdown-editor-lite demo</h3> */}
        {/* <nav className="nav">
          <button onClick={this.handleGetMdValue}>getMdValue</button>
          <button onClick={this.handleGetHtmlValue}>getHtmlValue</button>
          <button onClick={this.handleSetValue}>setValue</button>
        </nav> */}
        <div className="editor-wrap" style={{ marginTop: '30px' }}>
          <MdEditor
            ref={node => (this.mdEditor = node || undefined)}
            value={this.state.value}
            style={{ height: '500px', width: '100%' }}
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
              imageUrl: 'https://octodex.github.com/images/minion.png',
              syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
            }}
            onChange={this.handleEditorChange}
            // onImageUpload={this.handleImageUpload}
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