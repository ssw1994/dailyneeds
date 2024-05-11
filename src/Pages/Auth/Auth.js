import { useEffect, useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const register = () => {
    setIsLogin(false);
  };

  const login = () => {
    setIsLogin(true);
  };

  return (
    <>
      {isLogin && <Login fun={register} />}
      {!isLogin && <Register fun={login} />}
    </>
  );
}
