import { Transformer } from '@parcel/plugin';
import markdownit from 'markdown-it';
import hljs from 'highlight.js/lib/core';
import anchor from 'markdown-it-anchor';
import toc from 'markdown-it-table-of-contents';
import hlpython from 'highlight.js/lib/languages/python';
import fm from 'markdown-it-front-matter';
import yaml from 'yaml';

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

let fmFunction;

let fmPromise = new Promise((resolve) => {
  fmFunction = resolve;
});

md.use(fm, fmFunction);

export default new Transformer({
  async transform({ asset }) {
    let markdownContent = await asset.getCode();
    let html = md.render(markdownContent);
    let fmData = yaml.parse(await fmPromise);
    let htmlContent = `<%- include("partials/header.ejs", {page: "${fmData.page}", description: "${fmData.description}"}) -%>
    <main>
      ${html}
    </main>
    <%- include("partials/footer.ejs") -%>`;

    asset.type = 'ejs';
    asset.setCode(htmlContent);
    return [asset];
  }
});
