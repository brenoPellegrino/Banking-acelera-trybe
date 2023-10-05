import { useState } from "react";
import RedirectButton from "../RedirectButton";
import "./Menu.css";

export default function Menu() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  async function toggleMenu() {
    setIsOpened(!isOpened);
  }

  return (
    <div>
      <button
        onClick={() => toggleMenu()}
        className={`menu-button ${isOpened ? "menu-button-opened" : ""}`}
      >
        Menu
      </button>
      {isOpened ? (
        <div className="menu-content">
          <div className="home-btn">
            <RedirectButton path="/home" name="Home" clearToken={false} />
          </div>
          <div className="logout-btn">
            <RedirectButton path="/" name="Logout" clearToken={true} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
