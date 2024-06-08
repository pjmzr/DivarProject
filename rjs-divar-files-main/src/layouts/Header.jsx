import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { deleteCookie } from "utils/cookie";
import { getProfile } from "services/user";

import styles from "./Header.module.css";

function Header() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const menuHandler = () => setActive((active) => !active);

  const logoutHandler = () => {
    deleteCookie();
    refetch();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/" style={{ display: "flex" }}>
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div>
        <div className={styles.menu}>
          <span onClick={menuHandler}>
            <img src="profile.svg" />
            <p>دیوار من</p>
          </span>

          <div className={active ? styles.activeMenu : styles.deactiveMenu}>
            <Link to="/auth">
              <span>
                <img src="profile.svg" />
                <p>دیوار من</p>
              </span>
            </Link>
            <Link to="/auth">
              <span>
                <img src="profile.svg" />
                <p>دیوار من</p>
              </span>
            </Link>
            <Link to="/auth">
              <span>
                <img src="profile.svg" />
                <p>دیوار من</p>
              </span>
            </Link>
            <Link to="/auth">
              <span>
                <img src="profile.svg" />
                <p>دیوار من</p>
              </span>
            </Link>

            <span onClick={logoutHandler}>
              <img src="profile.svg" />
              <p>خروج</p>
            </span>
          </div>
        </div>
        <Link to="/dashboard" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
