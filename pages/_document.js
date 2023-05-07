import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>TicketMaster API</title>
      </Head>
      <body>
        <navbar>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>

          </ul>
        </navbar>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
