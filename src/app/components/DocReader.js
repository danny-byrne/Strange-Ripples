import React, { useEffect, useState } from 'react';
import {useClient} from 'react-server-dom-webpack/plugin';
import mammoth from 'mammoth';
import { JSDOM } from 'jsdom';

function processDocx(arrayBuffer) {
    return new Promise((resolve, reject) => {
      mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
        .then(function(result) {
          let html = result.value;
          
          let dom = new JSDOM(html);
          let quoteElements = dom.window.document.getElementsByTagName("quote");
          for (let quoteElement of quoteElements) {
            let blockquote = dom.window.document.createElement("blockquote");
            blockquote.innerHTML = quoteElement.innerHTML;
            quoteElement.parentNode.replaceChild(blockquote, quoteElement);
          }
  
          let textNodes = dom.window.document.body.childNodes;
          for (let textNode of textNodes) {
            if (textNode.nodeType === dom.window.Node.TEXT_NODE) {
              let paragraphs = textNode.textContent.split('\n\n');
              for (let i = 0; i < paragraphs.length - 1; i++) {
                let p = dom.window.document.createElement("p");
                p.textContent = paragraphs[i];
                dom.window.document.body.insertBefore(p, textNode);
              }
              textNode.textContent = paragraphs[paragraphs.length - 1];
            }
          }
  
          resolve(dom.serialize());
        })
        .catch(reject);
    });
  }

const DocxReader = () => {
    useClient();
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('../public/StrangeRipples.docx')
      .then(response => response.arrayBuffer())
      .then(res => processDocx(res))
      .then(doc => setHtmlContent(doc))
      .catch(err => console.error(err));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default DocxReader;