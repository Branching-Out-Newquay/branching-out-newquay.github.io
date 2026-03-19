import { Transformer } from '@parcel/plugin';
import markdownit from 'markdown-it';
import hljs from 'highlight.js/lib/core';
import anchor from 'markdown-it-anchor';
import toc from 'markdown-it-table-of-contents';
import hlpython from 'highlight.js/lib/languages/python';

hljs.registerLanguage('python', hlpython);

const md = markdownit({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
    highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return '';
  }
})

md.use(anchor.default); 
md.use(toc, {includeLevel: [1,2,3]}); 

export default new Transformer({
  async transform({ asset }) {
    let markdownContent = await asset.getCode();
    // TODO: we could add some front matter parsing here to allow for custom titles and descriptions for the header include
    let htmlContent = `<%- include("partials/header.ejs", {page: "Python Games", description: "A project guide to show learners how to start making games using Python and Pygame" }) -%>
    <main>
      ${md.render(markdownContent)}
    </main>
    <%- include("partials/footer.ejs") -%>`;

    asset.type = 'ejs';
    asset.setCode(htmlContent);
    return [asset];
  }
});
