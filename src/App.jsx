import { Contacts } from './components/Contacts/Contacts.jsx';
import { Features } from './components/Features/Features.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { Hero } from './components/Hero/Hero.jsx';
import { Menu } from './components/Menu/Menu.jsx';
import { Nav } from './components/Nav/Nav.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Menu />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
