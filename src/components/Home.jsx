import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

const Home = ({ isDarkBackground, toggleBackgroundColor }) => {
    return (
        <div className={styles.appContainer}>
            <button
                className={styles.backgroundButton}
                onClick={toggleBackgroundColor}
            >
                <FontAwesomeIcon icon={isDarkBackground ? faSun : faMoon} />
                {isDarkBackground ? ' Light' : ' Dark'}
            </button>
            <h2 className={styles.welcomeHeader}>
                Welcome! Shopping List App!
            </h2>
            <p className={styles.welcomeText}>
                Let's see what you need to buy!
            </p>
            <ul className={styles.nav}>
                <li>
                    <Link className={styles.navLink} to='/food-and-drinks'>
                        Food and Drinks
                    </Link>
                </li>
                <li>
                    <Link className={styles.navLink} to='/home-supplies'>
                        Home Supplies
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
