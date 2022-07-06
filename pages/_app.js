import "../styles/globals.css";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { SessionProvider } from "next-auth/react";




function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <div>
          <SessionProvider session={session} refetchInterval={5 * 60}>

        <Nav />
        <div className="content">
          <Component {...pageProps} />
          <Footer />
        </div>
        </SessionProvider>


    </div>
  );
}

export default MyApp;
