import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";

import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../services/firebase/firebase";

import styles from "./Header.module.css";

function Header({ onLoginClick, onRegistrationClick }) {
  const { user, isAuthenticated, isAuthLoading } = useAuth();

  const getNavLinkClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.activeLink : ""}`;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon} aria-hidden="true"></span>
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
          {!isAuthLoading && (
            <>
              {isAuthenticated ? (
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
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
