import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import styles from './components/styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [isDarkBackground, setIsDarkBackground] = useState(true);

    const toggleBackgroundColor = () => {
        setIsDarkBackground(!isDarkBackground);
    };

    return (
        <div className={styles.appContainer}>
            <div
                className={`${styles.phoneScreen} ${
                    isDarkBackground
                        ? styles.darkBackground
                        : styles.lightBackground
                }`}
            >
                <BrowserRouter>
                    <div className={styles.content}>
                        <button
                            className={`${styles.backgroundButton} ${styles.toggleButton}`}
                            onClick={toggleBackgroundColor}
                        >
                            <FontAwesomeIcon
                                icon={isDarkBackground ? faSun : faMoon}
                            />
                            {isDarkBackground ? ' Light' : ' Dark'}
                        </button>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <div>
                                        <h2>
                                            Welcome! <br /> Shopping List App!
                                        </h2>
                                        <p>Let's see what you need to buy!</p>
                                        <ul>
                                            <li>
                                                <Link to='/food-and-drinks'>
                                                    Food and Drinks
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/home-supplies'>
                                                    Home Supplies
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            />
                            <Route
                                path='/food-and-drinks'
                                element={
                                    <TodoContainer
                                        tableName={
                                            import.meta.env
                                                .VITE_FOODANDDRINKS_TABLE_NAME
                                        }
                                        sectionTitle='Food and Drinks'
                                        navLinks={[
                                            { path: '/', label: 'Home' },
                                            {
                                                path: '/home-supplies',
                                                label: 'Home Supplies',
                                            },
                                        ]}
                                    />
                                }
                            />
                            <Route
                                path='/home-supplies'
                                element={
                                    <TodoContainer
                                        tableName={
                                            import.meta.env
                                                .VITE_HOMESUPPLIES_TABLE_NAME
                                        }
                                        sectionTitle='Home Supplies'
                                        navLinks={[
                                            { path: '/', label: 'Home' },
                                            {
                                                path: '/food-and-drinks',
                                                label: 'Food and Drinks',
                                            },
                                        ]}
                                    />
                                }
                            />
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
