import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';

const CookieConsent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-box">
        <h2>We Use Cookies</h2>
        <p>
          We use cookies and similar technologies to enhance site navigation, analyze site usage, and assist our marketing efforts. By continuing to use this website, you agree to these conditions of use.
        </p>
        <p>
          For more iformation about these technologies and their use on this website, please consult our{' '}
          <Link
            to="/cookie-policy"
            className="cookie-policy-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleAccept}
          >
            <b><u>Cookie Policy</u></b>
          </Link>.
        </p>
        <button className="cookie-consent-ok" onClick={handleAccept}>OK</button>
      </div>
    </div>
  );
};

export default CookieConsent; 