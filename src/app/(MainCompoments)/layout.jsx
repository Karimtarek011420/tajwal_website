import Footer from "../_Compontents/Footer/Footer";
import Header from "../_Compontents/Header/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <div className="layoutfooter">
        <Header />
        <main className="contentfooter">{children}</main>
        <Footer />
      </div>
    </>
  );
}
