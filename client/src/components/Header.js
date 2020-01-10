import React from 'react';
import { Link } from 'react-router-dom'

const Header = (props) => {

  console.log('header render');
  return (
    <div>
      <nav>
        <ul>
          <li> <Link to = {'/'}>Top Tokens </Link></li>
          <li> <Link to = {'/portfolio'}>My Portfolio </Link></li>
          <button onClick = {props.switchTheme}>Change Theme</button>
        </ul>
      </nav>
    </div>
  );
}

export default Header
