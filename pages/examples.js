import Head from "next/head";
import styles from "../styles/Examples.module.css";

import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

import CopyButtonPlugin from '../scripts/hljsCopy'
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    hljs.highlightAll();

    hljs.addPlugin(new CopyButtonPlugin())
    hljs.configure({
      ignoreUnescapedHTML: true
    });

    const box = document.querySelector(".esBox");
    const list = document.querySelectorAll(".pre code");

    const esReg = /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]([^'"]+)['"]\s*/;
    const cjsReg = /const\s*\{([^}]+)\}\s*=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)\s*;/;

    box.addEventListener("change", (e) => {
      if(e.target.checked === true) {

        list.forEach((item) => {
          const match = item.textContent.split("\n")[0].match(cjsReg);
          if(match) {

            const content = item.textContent.split("\n");
            content.shift();
            
            const names = match[1].replace(/\s+/g, "")
            const pkgNames = match[2];

            item.textContent = `import {${names}} from '${pkgNames}';` + "\n" + content.join("\n");
            hljs.highlightAll();
          }
        })

      } else if(e.target.checked === false) {

        list.forEach((item) => {
          const match = item.textContent.split("\n")[0].match(esReg);
          if(match) {

            const content = item.textContent.split("\n");
            content.shift();
            
            const names = match[1];
            const pkgNames = match[2];

            item.textContent = `const {${names}} = require("${pkgNames}");` + "\n" + content.join("\n");
            hljs.highlightAll();
          }
        })

      }
    })
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Examples - utility-text</title>
        <meta
          name="description"
          content="official documentation site for npm package utility-text"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Examples</h1>

        <p className={styles.description}>
          utility-text is a text-based utility package with many functions which
          javascript does not provide by default. It can help with text
          manipulation, replacement and many more functions.<br />Here you can check examples of how you can use the functions available explaining each use case as you scroll down.
        </p>

        <code className={`${styles.codeScope} ${styles.esScope}`}>ES syntax? <input type="checkbox" className={`esBox`} /></code>

        <div className={styles.flex}>
          <div className={styles.example}>
            <p className={styles.codeExplanation}>this example shows how to use advanced replace when replacing specific occurences in a string.</p>
            <pre className={`${styles.pre} pre`}><code className="js">
              {`const {advanceReplace} = require("utility-text");
const text = "Hello Hello World";
const replacedText = advanceReplace({
  text,
  replacementText: "Hello",
  replacement: "Again,",
  countIndex: 1,
  skip: 1
});
console.log(replacedText);
`}
            </code></pre>
            <pre className={styles.preNoCopy}><code className="js">
              {`> "Hello Again, World"`}
            </code></pre>
          </div>

          <div className={styles.example}>
            <p className={styles.codeExplanation}>this example shows how to use multiple wrap to make them html elements.</p>
            <pre className={`${styles.pre} pre`}><code className="js">
              {`const {multipleWrap} = require("utility-text");
const text = "Hello World";
const wrappedText = multipleWrap({
  text,
  charSet: ["Hello", "World"],
  wrapperSet: [["<h1>", "</h1>"], ["<h2>", "</h2>"]]
});
console.log(wrappedText);
`}
            </code></pre>
            <pre className={styles.preNoCopy}><code className="js">
              {`> "<h1>Hello</h1> <h2>World</h2>" // still a string but you can set the element's .innerHTML if you really want this kind of usage`}
            </code></pre>
          </div>

          <div className={styles.example}>
            <p className={styles.codeExplanation}>the below code shows how you can move specific parts to another part of the sentence through their indexes</p>
            <pre className={`${styles.pre} pre`}><code className="js">
              {`const {moveTextByPos} = require("utility-text");
const text = "Hello World ";
const movedText = moveTextByPos({
  text,
  coords: [0, 4],
  moveIndex: 7
});
console.log(movedText);
`}
            </code></pre>
            <pre className={styles.preNoCopy}><code className="js">
              {`> "World Hello"`}
            </code></pre>
          </div>

          <div className={styles.example}>
            <p className={styles.codeExplanation}>this example shows how to put new text at the given position</p>
            <pre className={`${styles.pre} pre`}><code className="js">
              {`const {insertAt} = require("utility-text");
const text = "Hello World";
const insertedText = insertAt({
  text,
  index: 5,
  insertionText: "!"
});
console.log(insertedText);
`}
            </code></pre>
            <pre className={styles.preNoCopy}><code className="js">
              {`> "Hello! World"`}
            </code></pre>
          </div>

          <div className={styles.example}>
            <p className={styles.codeExplanation}>analyze is not really a useful function, but when using this package&apos;s functions, you will need it. Many functions require indexes and counts, and the analyze function returns you just that.</p>
            <pre className={`${styles.pre} pre`}><code className="js">
              {`const {analyze, advanceReplace} = require("utility-text");
const text = "Hello Hello Hello Hello Hello World";
const toBeReplaced = "Hello "; // there's a space at the end otherwise it would leave a huge gap between Hello and World.

// replace all occurences of a specific character/part of text.
const replacedText = advanceReplace({
  text,
  replacementText: toBeReplaced,
  replacement: "",
  countIndex: analyze({text, charSet: toBeReplaced}), // specifying Infinity would be impractical, as it would cause a loop till Infinity, even though there are no occurences left.
  skip: 1 // leaves the first, removes every other occurence.
});
console.log(replacedText);
// in the countIndex parameter, you can put analyze({...}) - 1  and change the skip to 0 so the last occurence is left out and the first and every other occurence is removed.
`}
            </code></pre>
            <pre className={styles.preNoCopy}><code className="js">
              {`> "Hello World"`}
            </code></pre>
          </div>
        </div>
      </main>
    </div>
  );
}
