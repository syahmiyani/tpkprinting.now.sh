import Head from "next/head";
import { Container } from "semantic-ui-react";

import Header from "./Header";
import HeadContent from "./HeadContent";

function Layout({ children, user }) {
  return (
    <>
      <Head>
        <HeadContent />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://res.cloudinary.com/dz8mnabzz/raw/upload/v1573538233/next-store-reed/styles.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://res.cloudinary.com/dz8mnabzz/raw/upload/v1574324458/next-store-reed/nprogress.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <title>TPK Design</title>
      </Head>
      <Header user={user} />
      <Container text style={{ paddingTop: "1em" }}>
        {children}
      </Container>
    </>
  );
}

export default Layout;
