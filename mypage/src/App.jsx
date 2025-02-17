import Header from "./components/Header";
import Section from "./components/Section";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import "./App.css";
const App = () => (
  // <div style={{ width: "100vw", height: "100vh", textAlign: "center", fontFamily: "Arial, Helvetica, sans-serif", backgroundColor: "#30334b", color: "white" }}>
  <div>
    <Header />
    <main>
      <Section id="home" title="Home">This is Home section.</Section>
      <Section id="about" title="About">This is About section.</Section>
      <Section id="contact" title="Contact">
        Feel free to contact me!
        <ContactForm />
      </Section>
    </main>
    <Footer />
  </div>
);

export default App;