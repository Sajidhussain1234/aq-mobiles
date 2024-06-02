import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  // TODO: we will add payment section when we add backedn

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddNewAddress = (newAddress) => {
    const updateUser = { ...user, addresses: [...user.addresses, newAddress] };
    console.log(updateUser, "uuuu");
    dispatch(updateUserAsync(updateUser));
    setShowAddAddressForm(false);
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("streetAddress", address.streetAddress);
    setValue("city", address.city);
    setValue("postalCode", address.postalCode);
    setValue("province", address.province);
  };

  const handleEdit = (updatedAddress, index) => {
    const updateUser = { ...user, addresses: [...user.addresses] };
    updateUser.addresses.splice(index, 1, updatedAddress);
    dispatch(updateUserAsync(updateUser));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (index) => {
    const updateUser = { ...user, addresses: [...user.addresses] }; // we use spread operator to escape from shallow copy issue
    updateUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(updateUser));
  };

  return (
    <div>
      <div>
        <div className="px-4 mx-auto bg-white max-w-7xl sm:px-6 lg:px-8 ">
          <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
            <h1 className="my-2 text-xl font-bold tracking-tight text-gray-900">
              Name: {user.name || "Anonymous User"}
            </h1>
            <h1 className="my-2 font-bold tracking-tight text-gray-900 text-md">
              email: {user.email || "anonymous@gmail.com"}
            </h1>
          </div>
          <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
            {/* Add New Address Section */}
            {!showAddAddressForm ? (
              <button
                onClick={(_) => {
                  setShowAddAddressForm(true);
                  setSelectedEditIndex(-1);
                }}
                className="px-3 py-2 mb-4 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Add New Address
              </button>
            ) : (
              <form
                className="px-5 bg-white"
                noValidate
                onSubmit={handleSubmit((newAddress) => {
                  handleAddNewAddress(newAddress);
                  setShowAddAddressForm(false);
                  reset();
                })}
              >
                <div className="space-y-12">
                  <div className="pb-8 border-b border-gray-900/10">
                    <h2 className="pt-10 text-4xl font-semibold leading-7 text-gray-900">
                      Add New Address
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
                        onClick={() => setShowAddAddressForm(false)}
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      >
                        Add New Address
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}

            <div className="pb-12 border-gray-900/10">
              <h1 className="my-2 font-bold tracking-tight text-gray-900 text-md">
                Your's Addresses:
              </h1>
              {user.addresses.map((address, index) => (
                <div key={index}>
                  {selectedEditIndex === index ? (
                    <form
                      className="px-5 bg-white"
                      noValidate
                      onSubmit={handleSubmit((updatedAddress) => {
                        handleEdit(updatedAddress, index);
                        reset();
                      })}
                    >
                      <div className="space-y-12">
                        <div className="pb-8 border-b border-gray-900/10">
                          <h2 className="pt-10 text-4xl font-semibold leading-7 text-gray-900">
                            Edit Address
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
                                    required:
                                      "State/Province is required field",
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
                                    required:
                                      "Zip/Postal Code is required field",
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
                              onClick={() => setSelectedEditIndex(-1)}
                              className="text-sm font-semibold leading-6 text-gray-900"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Update Address
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : null}
                  <div className="flex justify-between px-5 py-5 border-2 border-gray-200 border-solid rounded gap-x-6 ">
                    <div className="flex gap-x-4">
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
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <button
                        onClick={() => {
                          handleEditForm(index);
                          setShowAddAddressForm(false);
                        }}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          handleRemove(e, index);
                        }}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
