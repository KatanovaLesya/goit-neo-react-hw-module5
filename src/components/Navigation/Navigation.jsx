import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav className={styles.nav}>
    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
      Home
    </NavLink>
    <NavLink to="/movies" className={({ isActive }) => (isActive ? styles.active : '')}>
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
