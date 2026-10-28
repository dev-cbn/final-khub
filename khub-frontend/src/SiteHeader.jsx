
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './styles.module.css';
import logo from './assets/khub_green-removebg-preview.png';

const links = [
  ['Discover', 'discover'],
  ['Shop', 'shop'],
  ['Rent', 'rentals'],
  ['Services', 'services'],
  ['Jobs', 'jobs'],
  ['Rides & delivery', 'city'],
];

export default function SiteHeader({
  page = 'home',
  onNavigate,
  onList,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (destination) => {
    setMobileOpen(false);
    onNavigate(destination);
  };

  return (
    <header className={styles.header}>
      <div className={styles.navInner}>
        {/* KHUB is a text link, not a button */}
        
        <a
          className={styles.logo}
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            navigate('home');
          }}
          aria-label="KHUB home"
        >
          <img src={logo} alt="KHUB" />
        </a>

        <nav
          className={`${styles.nav} ${
            mobileOpen ? styles.navOpen : ''
          }`}
          aria-label="Main navigation"
        >
          {links.map(([label, destination]) => (
            <button
              key={destination}
              className={
                page === destination
                  ? styles.navCurrent
                  : undefined
              }
              aria-current={
                page === destination ? 'page' : undefined
              }
              onClick={() => navigate(destination)}
            >
              {label}
            </button>
          ))}
        </nav>

        {page !== 'shop' && (
          <button
            className={styles.signupButton}
            onClick={() => navigate('account')}
          >
            Sign up
          </button>
        )}

        <button
          className={styles.listButton}
          onClick={onList}
        >
          List on KHUB
        </button>

        <button
          className={styles.menuButton}
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={
            mobileOpen ? 'Close menu' : 'Open menu'
          }
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>
      </div>
    </header>
  );
}
