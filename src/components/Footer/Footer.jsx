import { FOOTER } from '../../data/content.js';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">{FOOTER}</div>
    </footer>
  );
}
