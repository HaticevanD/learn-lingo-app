import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";

import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../services/firebase";
import logo from "../../assets/logo.png";
import styles from "./Header.module.css";

function Header({ onLoginClick, onRegistrationClick }) {
  const { user, isAuthenticated, isAuthLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.activeLink : ""}`;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  const handleLoginClick = () => {
    closeMenu();
    onLoginClick?.();
  };

  const handleRegistrationClick = () => {
    closeMenu();
    onRegistrationClick?.();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMenu();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo} onClick={closeMenu}>
          <img
            src={logo}
            alt=""
            className={styles.logoImage}
            aria-hidden="true"
          />

          <span>LearnLingo</span>
        </NavLink>

        <nav className={styles.navigation} aria-label="Main navigation">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>

          <NavLink to="/teachers" className={getNavLinkClass}>
            Teachers
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/favorites" className={getNavLinkClass}>
              Favorites
            </NavLink>
          )}
        </nav>

        <div className={styles.authActions}>
          {!isAuthLoading &&
            (isAuthenticated ? (
              <>
                <span className={styles.userName}>
                  {user?.displayName || user?.email}
                </span>

                <button
                  type="button"
                  className={styles.logoutButton}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.loginButton}
                  onClick={onLoginClick}
                >
                  <span className={styles.loginIcon} aria-hidden="true">
                    ↳
                  </span>
                  Log in
                </button>

                <button
                  type="button"
                  className={styles.registrationButton}
                  onClick={onRegistrationClick}
                >
                  Registration
                </button>
              </>
            ))}
        </div>

        <button
          type="button"
          className={`${styles.menuButton} ${
            isMenuOpen ? styles.menuButtonOpen : ""
          }`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>
      </div>

      <div
        className={`${styles.mobileMenuBackdrop} ${
          isMenuOpen ? styles.mobileMenuBackdropOpen : ""
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav className={styles.mobileNavigation} aria-label="Mobile navigation">
          <NavLink to="/" className={getNavLinkClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink
            to="/teachers"
            className={getNavLinkClass}
            onClick={closeMenu}
          >
            Teachers
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/favorites"
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              Favorites
            </NavLink>
          )}
        </nav>

        <div className={styles.mobileAuthActions}>
          {!isAuthLoading &&
            (isAuthenticated ? (
              <>
                <span className={styles.mobileUserName}>
                  {user?.displayName || user?.email}
                </span>

                <button
                  type="button"
                  className={styles.mobileLogoutButton}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.mobileLoginButton}
                  onClick={handleLoginClick}
                >
                  Log in
                </button>

                <button
                  type="button"
                  className={styles.mobileRegistrationButton}
                  onClick={handleRegistrationClick}
                >
                  Registration
                </button>
              </>
            ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
