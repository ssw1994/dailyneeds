import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./CSS/index.scss";
import { Provider } from "react-redux";
import Store from "./Store";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./Services/AppRouter";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const root = ReactDOM.createRoot(document.getElementById("root"));

const stripePromise = loadStripe(
  "pk_test_51Kb3EcSIWAAUtzpKwkGBOL3OJtGbo8KEtWCYqjUowDNacnrlrLYCE2AzN0sObS2YMr5bfbF8fGyRNlDaWNiXKsgG00ZtiBhOfs"
);
root.render(
  <Elements stripe={stripePromise}>
    <Provider store={Store}>
      {/* <React.StrictMode> */}
      <RouterProvider router={AppRouter}></RouterProvider>
      {/* </React.StrictMode> */}
    </Provider>
  </Elements>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
