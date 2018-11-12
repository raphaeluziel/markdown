import React from 'react';
import ReactDOM from 'react-dom';
import './markdown.css';

// To enable open link in new tab
const renderer = new marked.Renderer();

renderer.link = (address = "#", title = "", content = "") => (
   `<a target="_blank" href=${address} title=${title}>${content}</a>`
);

marked.setOptions({
  gfm: true,
  breaks: true,
});

let markdown = `# Heading

## Subheading

[Google](https://www.google.com)

> Blockquote goes here. Once upon a time in America there were three bears, a mama bear, a papa bear, and a little baby bear.  One day they went into the forest, a tree fell.  Did the tree make a sound?  Nobody really knows.

1. One
2. Two
3. Three
4. Four

![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg/320px-Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg)

**Bold text**` +
    "\n\n" +
    "`Some inline code`" +
    "\n\n" +
    "```" +
    "\n" +
    "Code block which should go on forever\ regardless of how long it is and should not wrap" +
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
        <textarea
          id="editor"
          value={this.state.value}
          onChange={this.handleChange}
          rows="14"
          cols="80"
        />
        <div id='preview' dangerouslySetInnerHTML = {{__html: this.state.upValue}}/>
      </div>  
    );
  }
}

// ========================================

ReactDOM.render(
  <Editor />,
  document.getElementById('root')
);
