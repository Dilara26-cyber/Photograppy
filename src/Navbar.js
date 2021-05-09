import React from 'react';
import '../src/assets/Navbar.scss';
import { MdMonochromePhotos } from 'react-icons/md';
import { AiOutlineMore } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
const Navbar = (props) => {
  const navItems = ['app', 'about', 'contact'];
  return (
    <nav>
      <div className="logo-icon">
        <MdMonochromePhotos className="logo" />
        <AiOutlineMore
          className={props.nav ? 'nav__icon' : 'nav__icon active'}
          onClick={props.setNav}
        />
        <AiOutlineClose
          className={props.nav ? 'nav__icon active' : 'nav__icon'}
          onClick={props.setNav}
        />
      </div>

      <ul className={props.nav ? 'nav__list active' : 'nav__list'}>
        {navItems.map((item, index) => {
          return (
            <li className="nav__item" key={index}>
              <a href={`#${item}`} key={index} id="nav__link">
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
