import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Raby-blog</title>
        {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        /> */}
      </Head>
      <Script
        src="https://fonts.googleapis.com/icon?family=Material+Icons"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
