import React from 'react'
import Link from 'gatsby-link'

import topimage from './header.jpg';
import styles from './header.module.css';

const Header = () => (
  <div className={styles.wrapper}>
    <img src={topimage} alt="" className={`fit ${styles.image}`}/>
    <Link to="/" className={styles["heading-link"]}>
      <h1 className={styles.heading}>Here in Oaxaca</h1>
    </Link>
  </div>
);

export default Header
