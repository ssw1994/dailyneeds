import "./App.css";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppState,
  appLoading,
  blogState,
  fetchUserDetails,
  isLoggedIn,
  toastMsg,
} from "./Store";
import Spinner from "./Shared/Spinner/Spinner";
import Toaster from "./Shared/Toaster/Toaster";
import ErrorBoundry from "./Shared/ErrorBoundry/ErrorBoundry";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector(isLoggedIn);
  const state = useSelector(AppState);
  const showLoader = useSelector(appLoading);
  useEffect(() => {
    setTimeout(() => {
      console.log(isUserLoggedIn);
      if (isUserLoggedIn) {
        navigate("/apps");
      } else {
        navigate("/auth");
      }
    }, 2000);
  }, [isUserLoggedIn]);

  useEffect(() => {
    console.log(`${Date.now()}`, state);
  }, [state]);

  useEffect(() => {
    if (window.localStorage) {
      const token = localStorage.getItem("x-access-token");
      if (token) {
        dispatch(fetchUserDetails());
      }
    }
  }, []);

  const toastMessage = useSelector(toastMsg);
  return (
    <>
      <Spinner loading={showLoader}>
        <Outlet></Outlet>
      </Spinner>
      {toastMessage && <Toaster toastMessage={toastMessage} />}
    </>
  );
}

export default App;

//add proto types here....
(() => {
  Array.prototype.fillArray = function (limit, value) {
    const arr = [];
    if (!value) {
      for (let i = 0; i < limit; i++) {
        arr.push(i);
      }
    }

    if (value) {
      for (let i = 0; i < limit; i++) {
        arr.push(value);
      }
    }
    return arr;
  };
})();
