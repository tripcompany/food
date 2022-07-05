import "../styles/globals.css";
import Nav from "../components/nav";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Nav />
      <div className="content">
        <Component {...pageProps} />
        <Footer />
      </div>
    </div>
  );
}

export default MyApp;
