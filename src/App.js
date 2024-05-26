import { useEffect } from "react";
import "./App.css";
import Protected from "./features/auth/components/Protected";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignupPage from "./pages/SignupPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import {
  fetchItemsByUserIdAsync,
  selectItems,
} from "./features/cart/cartSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        {" "}
        <Home />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/cart",
    element: (
      // <Protected>
      <CartPage />
      // </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      // <Protected>
      // {" "}
      <Checkout />
      // </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    // Fetch Cart item for user when he land on a website
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
