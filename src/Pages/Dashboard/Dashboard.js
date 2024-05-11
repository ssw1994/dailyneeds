import { React } from "react";
import { apps as AllApps } from "../../Models";
import { useNavigate } from "react-router";
import { setActiveApp } from "../../Store";
import { useDispatch } from "react-redux";

const AppCard = (props) => {
  const { appName, icon, path } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gotoPage = () => {
    try {
      navigate(path);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setActiveApp(props));
    }
  };

  return (
    <button className="app-card" onClick={gotoPage}>
      <i className={icon}></i>
      {appName}
    </button>
  );
};
export default function Dashboard() {
  const apps = AllApps;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = () => {
    dispatch(
      setActiveApp({
        appName: "Settings",
        path: "/settings",
        icon: "fa-solid fa-gear",
      })
    );
    navigate("/settings");
  };

  return (
    <div className="flex-row-center-items h-100">
      <button className="app-settings" onClick={settings}>
        <i className="fa-solid fa-gear"></i>
      </button>
      <div className="flex-row-center-items" style={{ width: "50%" }}>
        {apps.map((app) => {
          return <AppCard {...app} key={app?.appName} />;
        })}
      </div>
    </div>
  );
}
