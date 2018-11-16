import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import marked from 'marked';

// To enable open link in new tab
const renderer = new marked.Renderer();

renderer.link = (address = "#", title = "", content = "") => (
   `<a target="_blank" href=${address} title=${title}>${content}</a>`
);

marked.setOptions({
  gfm: true,
  breaks: true,
});

let markdown = `# Heading for your page

## Here you can place a subheading

A link:
[Google](https://www.google.com)

A quote from the world of science:

> The important thing is not to stop questioning. Curiosity has its own reason for existence. One cannot help but be in awe when he contemplates the mysteries of eternity, of life, of the marvelous structure of reality. It is enough if one tries merely to comprehend a little of this mystery each day.
*-Albert Einstein*

A list of my favorite musical groups:
1. Led Zepellin
2. Cage the Elephant
3. Peter, Paul and Mary
4. P!nk

An image of a place I would like to visit:

![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg/320px-Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg)

**This is important so I make it bold!**` +
    "\n\nSome inline code:\n\n" +
    "`for (let i=0; i<10; i++)`" +
    "\n\nA block of code:\n\n" +
    "```" +
    "\n" +
    "While (i < 10)\n" +
    "{\n" +
    "   i += 2;\n" +
    "   document.write(everything.value);\n" +
    "}\n" +
    "```"

let markup = marked(markdown, { renderer });

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: markdown,
      upValue: markup
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let withMarkup = marked(event.target.value, { renderer });
    this.setState({ value: event.target.value, upValue: withMarkup});
  }
  render() {
    return (
      <div>
        <h1 align="center">Markdown Previewer</h1><br /><br/>
        <div class="flex-container">
          <div>
            <h5>Type your markdown in the box below:</h5>
            <textarea id="editor" value={this.state.value} onChange={this.handleChange} />
          </div>
          <div>
            <h5>This is the result:</h5>
            <div id='preview' dangerouslySetInnerHTML = {{__html: this.state.upValue}}/>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Editor />,
  document.getElementById('root')
);
