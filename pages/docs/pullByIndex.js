import Head from "next/head";
import styles from "../../styles/docs/global.module.css";

import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

import CopyButtonPlugin from "../../scripts/hljsCopy";

hljs.registerLanguage("javascript", javascript);

import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    hljs.highlightAll();

    hljs.addPlugin(new CopyButtonPlugin())
  }, []);

  return (
    <div className={styles.container}>

      <Head>
        <title>Docs: pullByIndex</title>
        <meta
          name="description"
          content="official documentation site for npm package utility-text"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}><code className={styles.headCode_L}>pullByIndex()</code></h1>

        <p className={styles.description}>pulls multiple values by their index from array</p>

        <pre><code className="js">
          {`const { pullByIndex } = require("utility-text");
const myList = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10];

const pulled = pullByIndex(myList, 0, 1, 2); // second third and fourth index are pulled
console.log(pulled);
`}
        </code></pre>

        <h2 className={styles.subTitle}>Parameters</h2>

        <ul className={styles.paramList}>
          <li className={styles.parameter}>array <span className={styles.invertCode}>Array</span> <span className={styles.important}>*</span></li>
          <br />
          <li className={styles.parameter}>...valueIndexes <span className={styles.invertCode}>&lt;array indexes&gt;</span> <span className={styles.important}>*</span> <br /><span className={styles.paramSub}>the values&apos; index you want to pull from the array</span></li>
        </ul>

        <h2 className={styles.subTitle}>Returns</h2>

        <ul className={styles.paramList}>
          <li className={styles.parameter}>&lt;array&gt; <span className={styles.invertCode}>Array</span> <br /><span className={styles.paramSub}>the modified array</span></li>
        </ul>

      </main>
    </div>
  );
}
