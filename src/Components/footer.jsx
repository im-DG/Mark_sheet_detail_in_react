import React from 'react';

function Footer() {
    const socialMediaLinks = [
        { name: 'Facebook', link: 'https://www.facebook.com', icon: <span className="fab fa-facebook fontawesome"></span> },
        { name: 'Twitter', link: 'https://www.twitter.com', icon: <span className="fab fa-twitter fontawesome"></span> },
        { name: 'Instagram', link: 'https://www.instagram.com', icon: <span className="fab fa-instagram fontawesome"></span> },
        { name: 'LinkedIn', link: 'https://www.linkedin.com', icon: <span className="fab fa-linkedin fontawesome"></span> },
      ];
      
 return (
    <footer>
      <nav className="social-media-nav">
        <ul className="social-media-list">
          {socialMediaLinks.map((link) => (
            <li key={link.name}>
              <a href={link.link} target="_blank" rel="noopener noreferrer">{link.icon}</a>
            </li>
          ))}
        </ul>
      </nav>
    
    </footer>
  );
}

export default Footer;
