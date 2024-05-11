export const Action = {
  NONE: "none",
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
};
export const apps = [
  {
    appName: "Todos",
    icon: "fa-regular fa-rectangle-list",
    id: 1,
    path: "/todos",
  },
  {
    appName: "Expense Tracker",
    icon: "fa-solid fa-scale-unbalanced",
    id: 2,
    path: "/expenseTracker",
  },
  {
    appName: "Blogs",
    icon: "fa-brands fa-blogger",
    id: 3,
    path: "/blogs",
  },
  {
    appName: "Trades",
    icon: "fa-solid fa-money-bill-trend-up",
    id: 4,
    path: "/trades",
  },
  {
    appName: "Balaji Store",
    icon: "fa-brands fa-shopify",
    id: 5,
    path: "/shop",
  },
  {
    appName: "Tour Planner",
    icon: "fa-solid fa-umbrella-beach",
    id: 6,
    path: "/tourplanner",
  },
];

export const SETTINGS_MENU = [
  {
    name: "Profile",
    icon: "fa-regular fa-user",
    id: 1,
    path: "/settings/profile",
  },
  {
    name: "App Tags",
    icon: "fa-solid fa-tags",
    id: 1,
    path: "/settings/tags",
  },
];

export const SHOP_MENU = [
  {
    name: "My Cart",
    icon: "fa-solid fa-basket-shopping",
    id: 0,
    path: "/shop/my-cart",
  },
  {
    name: "My Orders",
    icon: "fa-solid fa-basket-shopping",
    id: 1,
    path: "/shop/my-orders",
  },
  {
    name: "Add Product",
    icon: "fa-solid fa-plus",
    id: 2,
    path: "/shop/add-product",
  },
  {
    name: "My Wishlist",
    icon: "fa-solid fa-heart",
    id: 3,
    path: "/shop/my-wish",
  },
  {
    name: "My Basket",
    icon: "fa-solid fa-cart-shopping",
    id: 4,
    path: "/shop/my-cart",
  },
  {
    name: "My Address",
    icon: "fa-solid fa-address-book",
    id: 5,
    path: "/shop/my-address",
  },
];

export const TOUR_MENU = [
  {
    name: "Planning",
  },
];

export const MODE = {
  VIEW: "view",
  EDIT: "edit",
};

export const ADDRESS_TYPES = ["OTHER", "WORK", "HOME"];
