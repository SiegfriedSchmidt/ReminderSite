import React from 'react';
import StyledHeader from "./StyledHeader.tsx";
import {Link} from "react-router-dom";
import reminderIcon from "../../assets/site_icon.svg"
import accountIcon from "../../assets/account_icon.svg"
import useUser from "../../hooks/useUser.tsx";

const Header = () => {
  const {user} = useUser()

  return (
    <StyledHeader>
      <Link to="/">
        <nav>
          <img src={reminderIcon} alt="icon"/>
          <p>Noons.ru</p>
        </nav>
      </Link>

      <Link to="/login">
        <nav>
          <img src={accountIcon} alt="logo"/>
          {user?.username ? <p>{user.username}</p> : <p>Вход</p>}
        </nav>
      </Link>
    </StyledHeader>
  );
};

export default Header;