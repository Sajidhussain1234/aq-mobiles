import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../features/auth/authSlice";
import { useState } from "react";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";

const quantityOption = [1, 2, 3, 4, 5];

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectItems);
  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = (e) => {
    const newOrder = {
      items,
      totalItems,
      totalAmount,
      paymentMethod,
      user,
      selectedAddress,
      status: "pending", //other status can be,dispatch, delivered, received
    };
    dispatch(createOrderAsync(newOrder));

    // TODO: redirect to order success page?
    // TODO: clear the cart items
    // TODO: stack should be updated in db
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      {/* <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"> */}
      <div className="px-4 mx-auto bg-white max-w-7xl sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-5">
          <div className="border-gray-300 lg:border-r-2 lg:col-span-3">
            <form
              className="px-5 bg-white"
              noValidate
              onSubmit={handleSubmit((newAddress) => {
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, newAddress],
                  })
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="pb-8 border-b border-gray-900/10">
                  <h2 className="pt-10 text-4xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "Name is required field",
                          })}
                          id="name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is required field",
                          })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "Phone number is required field",
                          })}
                          type="tel"
                          autoComplete="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></input>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="streetAddress"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("streetAddress", {
                            required: "Address is required field",
                          })}
                          id="streetAddress"
                          autoComplete="streetAddress"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "City is required field",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="province"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("province", {
                            required: "State/Province is required field",
                          })}
                          id="province"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("postalCode", {
                            required: "Zip/Postal Code is required field",
                          })}
                          id="postalCode"
                          autoComplete="postalCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-8 gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>

                <div className="pb-12 border-b border-gray-900/10">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Existing Addresses
                  </h2>
                  <p className="m-2 text-sm leading-6 text-gray-600">
                    Choose from existing addresses
                  </p>
                  <ul role="list">
                    {user?.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex justify-between px-5 py-5 border-2 border-gray-200 border-solid rounded gap-x-6 "
                      >
                        <div className="flex gap-x-4">
                          <input
                            name="address"
                            type="radio"
                            value={index}
                            onChange={handleAddress}
                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                          />
                          <div className="flex-auto min-w-0">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                              {address.streetAddress}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                              {address.city} {" - "} {address.postalCode}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                              {address.province}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {address.email}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            {address.phone}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        {" "}
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose one.
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            type="radio"
                            value="cash"
                            onChange={handlePayment}
                            checked={paymentMethod === "cash"}
                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Via Cash Payment
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payments"
                            type="radio"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={handlePayment}
                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Via Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* Cart Item Section */}
          <div className="lg:col-span-2">
            <div className="px-4 mx-auto bg-white max-w-7xl sm:px-6 ">
              <div className="py-4 border-b border-gray-200 ">
                <h1 className="my-4 text-3xl font-bold tracking-tight text-gray-900">
                  Cart Items
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((item) => (
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
                              <p className="ml-4">{item?.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.color}
                            </p>
                          </div>
                          <div className="flex items-end justify-between flex-1 text-sm">
                            <p className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty
                              </label>
                              <select
                                onChange={(e) => {
                                  handleQuantity(e, item);
                                }}
                                value={item.quantity}
                              >
                                {quantityOption.map((val) => (
                                  <option key={val} value={val}>
                                    {val}
                                  </option>
                                ))}
                              </select>
                            </p>

                            <div className="flex">
                              <button
                                onClick={(e) => {
                                  handleRemove(e, item.id);
                                }}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="py-4 border-t border-gray-200 ">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-indigo-700"
                  >
                    Order Now
                  </div>
                </div>
                <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
