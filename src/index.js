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

let markdown = `# Heading or Title of your page

## This is a subheading of your page

A link to google

[Google](https://www.google.com)

A quote from physics:

> Physics is an attempt conceptually to grasp reality as something that is considered to be independent of its being observed. In this sense one speaks of physical reality.

A list of musical groups I like:

1. Led Zeppellin
2. Cage the elephant
3. Lou Reed
4. Peter, Paul and Mary

An image I love:

![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg/320px-Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg)

**Bold text for emphasis**` +
    "\n\n" +
    "`for (let i=0; i < 10; i++)`" +
    "\n\n" +
    "```javascript" +
    "\n" +
    A code block goes here
    "\n" +
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
        <div class="container-fluid">
          <h1 align="center">Markdown Previewer</h1>
          <div class="row">
            <div class="col-xs-6">
              <h4>Type your markdown in the box below:</h4>
              <textarea
                id="editor"
                value={this.state.value}
                onChange={this.handleChange}
                rows="14"
                cols="80"
              />
            </div>
            <div class="col-xs-6">
              <h4>This is how your html will appear:</h4>
              <div id='preview' dangerouslySetInnerHTML = {{__html: this.state.upValue}}/>
            </div>
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
