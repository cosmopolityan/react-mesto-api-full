import React from 'react';
// import { Link, useLocation, useHistory } from 'react-router-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  const path = useLocation();
  // const history = useHistory();
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    props.logIn(false)
    // history.push('/sign-in');
    navigate('/sign-in', { replace: true });
  }

  return (
    <header className="header">
      <a href="#" className="header__link">
        <img src={logo} alt="Надпись: Место. Россия" className="header__logo" />
      </a>
      <div className="header__text">
        {!props.loggedIn && <Link to={path.pathname === "/sign-in" ? "/sign-up" : "/sign-in"}
          className="header__link">
          {path.pathname === "/sign-in" ? "Регистрация" : "Войти"}
        </Link>}
        {props.loggedIn && <p className="header__text">
          {props.userEmail}
        </p>}
        {props.loggedIn && <p onClick={signOut} className="header__link header__link_type_logout">Выйти</p>}
      </div>
    </header>
  );
}

export default Header;