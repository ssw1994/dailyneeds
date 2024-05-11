import React, { useContext } from "react";
import { SidebarContext } from "../../../Contexts";
import { All_Apps } from "../../../Models";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getActiveApp } from "../../../Store";
export default function SideBar({ menus }) {
  const app = useSelector(getActiveApp);
  const sidebar = useContext(SidebarContext);
  const navigate = useNavigate();
  const gotoMenu = (menu) => {
    navigate(menu.path);
    sidebar(false);
  };
  return (
    <div className="side-bar">
      <button className="side-bar-close-btn" onClick={() => sidebar(false)}>
        <i className="fa-regular fa-rectangle-xmark"></i>
      </button>

      <div className="contents">
        <label>
          <i className={app?.icon}></i>
          {app?.appName}
        </label>
        {menus && menus?.length > 0 && (
          <ul className="menu-items">
            {menus.map((menu, index) => (
              <li className="menu-item" key={index}>
                <button onClick={(e) => gotoMenu(menu)}>
                  {menu?.icon && <i className={menu.icon}></i>} &nbsp;
                  {menu.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
