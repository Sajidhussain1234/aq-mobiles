import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";
import { Link } from "react-router-dom";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userOrders = useSelector(selectUserOrders);

  console.log(userOrders, "orders of specific user");

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, []);

  return (
    <div>
      {" "}
      {userOrders.map((order) => (
        <div key={order.id}>
          <div className="px-4 mx-auto bg-white max-w-7xl sm:px-6 lg:px-8 ">
            <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
              <h1 className="my-2 text-xl font-bold tracking-tight text-gray-900">
                Order ID: {order.id} - Order Status: {order.status}
              </h1>

              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                        <img
                          src={item.imageSrc}
                          alt={item.name}
                          className="object-cover object-center w-full h-full"
                        />
                      </div>

                      <div className="flex flex-col flex-1 ml-4">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}>{item.name}</a>
                            </h3>
                            <p className="ml-4">$ {item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Brand: {item.brand}
                          </p>
                        </div>
                        <div className="flex items-end justify-between flex-1 text-sm">
                          <p className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty: {item.quantity}
                            </label>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$ {order.totalAmount}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{order.totalItems} items</p>
              </div>
              <div className="pb-12 border-gray-900/10">
                <h2 className="mb-2 text-xl font-semibold leading-7 text-gray-900 ">
                  Shipping Address
                </h2>
                <div className="flex justify-between px-5 py-5 border-2 border-gray-200 border-solid rounded gap-x-6 ">
                  <div className="flex gap-x-4">
                    <div className="flex-auto min-w-0">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress.name}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        {order.selectedAddress.streetAddress}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        {order.selectedAddress.city} {" - "}{" "}
                        {order.selectedAddress.postalCode}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        {order.selectedAddress.province}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectedAddress.email}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectedAddress.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
