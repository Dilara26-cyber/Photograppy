import React, { useState } from 'react';
import Navbar from './Navbar';
import './assets/Hero.scss';
import svg from './undraw_Selfie_re_h9um.svg';
const Hero = () => {
  const [nav, setNav] = useState(false);
  const openTheNavbar = () => {
    setNav(!nav);
  };
  return (
    <header>
      <div className="Hero">
        <div className="hero_bg"></div>
        <section className="hero__content glass">
          <Navbar nav={nav} setNav={openTheNavbar} />
          <div className="hero__text">
            <h1>PHOTOGRAPPY</h1>
            <p>A web app where you can upload photos and edit them.</p>{' '}
            <a href="#app" className="cta">
              Try the App
            </a>
          </div>{' '}
          <div className="hero__img">
            <img
              className="hero__img__one"
              src={svg}
              alt="A hand holding a phone for taking selfie"
            />
          </div>
        </section>
      </div>
    </header>
  );
};

export default Hero;
