import React, { useContext } from "react";
import { SidebarContext } from "../../../Contexts";
import { useDispatch, useSelector } from "react-redux";
import {
  getActiveApp,
  isLoggedIn,
  signout,
  userDetails,
  userProfileInfo,
} from "../../../Store";
import { useLocation, useNavigate } from "react-router";
import ProfilePic from "../../../Shared/ProfilePic/ProfilePic";
export default function NavBar({ menus }) {
  const navigate = useNavigate();
  const sidebar = useContext(SidebarContext);
  const user = useSelector(userDetails);
  const isLogin = useSelector(isLoggedIn);
  const location = useLocation();
  const currentApp = useSelector(getActiveApp);
  const profileInfo = useSelector(userProfileInfo);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(signout());
  };

  const gotoHome = () => {
    console.log(location);
    if (currentApp && location.pathname !== currentApp?.path) {
      navigate(currentApp?.path);
    } else {
      navigate("/apps");
    }
  };

  return (
    <div className="nav-bar flex-row">
      {menus && (
        <button onClick={sidebar}>
          <i className="fa-solid fa-bars"></i>
        </button>
      )}
      <button onClick={gotoHome}>
        <i className="fa-solid fa-house"></i>{" "}
      </button>
      <strong>{currentApp?.appName}</strong>
      <div
        className="flex-row-justify-right w-100"
        style={{ paddingRight: "15px" }}
      >
        <div className="flex-row-center-items" style={{ gap: "5px" }}>
          <ProfilePic thumbnail={true} url={profileInfo?.picture} />
          <label>{user?.username}</label>
        </div>
        {isLoggedIn && (
          <button onClick={signOut}>
            <i className="fa-solid fa-right-to-bracket"></i>
          </button>
        )}
      </div>
    </div>
  );
}
