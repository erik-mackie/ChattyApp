import React, {Component} from 'react';


function NavBar(props) {

  const users = props.numUsers;
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="navbar-counter">{props.numUsers} users online</p>
      </nav>
    );
}

export default NavBar;


