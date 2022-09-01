import React from 'react';
const today = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
    <p className="footer__copyright">&#169; {today} Mark G.</p>
  </footer>
  );
}

export default Footer;