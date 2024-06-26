import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetCurrentOrder } from "../features/order/orderSlice";

export default function OrderSuccessPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const resetCartItems = () => {
    dispatch(resetCartAsync(user.Id));
    // reset current order
    dispatch(resetCurrentOrder());
  };

  useEffect(() => {
    // dispatch(resetCartAsync(user.id));
    // dispatch(resetOrder());
  }, []);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full px-6 py-24 bg-white place-items-center sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order Successfully placed:
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Number : {params.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can see yours order in My account - my order
          </p>
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <Link
              to="/"
              onClick={resetCartItems}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
