import React, { useRef, useState } from "react";
import SideBar from "../../Pages/Home/SideBar/SideBar";
import NavBar from "../../Pages/Home/NavBar/NavBar";
import { Outlet } from "react-router";
import { SidebarContext } from "../../Contexts";
export default function CommentLayout({ menus }) {
  const [isOpened, open] = useState(false);
  const toggleSideBar = (value) => {
    open(value && typeof value === "boolean" ? value : !isOpened);
  };
  return (
    <SidebarContext.Provider value={toggleSideBar}>
      <div>
        <div>
          <NavBar menus={menus} />
          {isOpened && menus && <SideBar menus={menus} />}
        </div>
        <div
          className={`contents ${
            isOpened ? "sidebar-opened" : "sidebar-closed"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
