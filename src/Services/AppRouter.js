import { createBrowserRouter } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Blogs from "../Pages/Home/Blogs/Blogs";
import CreateBlog from "../Pages/Home/Blogs/CreateBlog";
import VerifyEmail from "../Shared/VerifyEmail/VerifyEmail";
import App from "../App";
import ViewBlog from "../Pages/Home/Blogs/ViewBlog";
import Dashboard from "../Pages/Dashboard/Dashboard";
import CommentLayout from "../Shared/CommonLayout/CommentLayout";
import TradeDashboard from "../Apps/Trades/TradeDashboard/TradeDashboard";
import Profile from "../Apps/Settings/Profile/Profile";
import Tags from "../Shared/Tags/Tags";
import { SETTINGS_MENU, SHOP_MENU } from "../Models";
import Products from "../Apps/BalajiStore/Products/Products";
import AddProduct from "../Apps/BalajiStore/AddProduct/AddProduct";
import TagSettings from "../Apps/Settings/TagSettings/TagSettings";
import ProductDetails from "../Apps/BalajiStore/ProductDetails/ProductDetails";
import CartItems from "../Apps/BalajiStore/CartItems/CartItems";
import PageNotFound from "../Shared/PageNotFound/PageNotFound";
import Tours from "../Apps/TourPlanner/Tours/Tours";
export default (function () {
  return createBrowserRouter([
    {
      path: "",
      element: <App />,
      children: [
        {
          path: "auth",
          element: <Auth />,
        },
        {
          path: "apps",
          element: <Dashboard />,
        },
        {
          path: "blogs",
          element: <CommentLayout />,
          children: [
            {
              path: "",
              element: <Blogs />,
            },
            {
              path: "create",
              element: <CreateBlog />,
            },
            {
              path: "view/:blogId",
              element: <ViewBlog />,
            },
          ],
        },
        {
          path: "trades",
          element: <CommentLayout />,
          children: [
            {
              path: "",
              element: <TradeDashboard />,
            },
          ],
        },
        {
          path: "settings",
          element: <CommentLayout menus={SETTINGS_MENU} />,
          children: [
            {
              path: "",
              element: <Profile />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "tags",
              element: <TagSettings />,
            },
          ],
        },
        {
          path: "todos",
          element: <CommentLayout />,
          children: [],
        },
        {
          path: "expenseTracker",
          element: <CommentLayout />,
          children: [],
        },
        {
          path: "shop",
          element: <CommentLayout menus={SHOP_MENU} />,
          children: [
            {
              path: "",
              element: <Products />,
            },
            {
              path: "add-product",
              element: <AddProduct />,
            },
            {
              path: "details/:id",
              element: <ProductDetails />,
            },
            {
              path: "my-cart",
              element: <CartItems />,
            },
          ],
        },
        {
          path: "tourplanner",
          element: <CommentLayout />,
          children: [
            {
              path: "",
              element: <Tours />,
            },
          ],
        },
        {
          path: "verifyEmail/:username",
          element: <VerifyEmail />,
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
})();
