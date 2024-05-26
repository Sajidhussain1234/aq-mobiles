import React, { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductsAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductByFilterAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectTotalItems,
} from "../productSlice";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { selectItems } from "../../cart/cartSlice";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const totalItems = useSelector(selectTotalItems);

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brands",
      name: "Brands",
      options: brands,
    },
  ];
  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    //TODO: on server it will support multiple categories
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
    // console.log(newFilter)
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  };

  useEffect(() => {
    // If there is no filter set than fetchProductByFilterAsync() will get all products
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductByFilterAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchBrandsAsync());
  }, []);

  return (
    <div className="bg-white">
      <div>
        <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
        />

        <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="p-2 ml-5 -m-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter handleFilter={handleFilter} filters={filters} />
              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductGrid products={products}></ProductGrid>
              </div>
              {/* Product grid end */}
            </div>
          </section>

          {/* Pagination */}
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalItems}
          />
        </main>
      </div>
    </div>
  );
}

//======================================  Components  =====================================================

// For DesktopFilter Component
function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  filters,
  handleFilter,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="px-4 py-6 border-t border-gray-200"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="flow-root -mx-2 -my-3">
                          <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="flex items-center ml-6">
                              {open ? (
                                <MinusIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="flex-1 min-w-0 ml-3 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

// For DesktopFilter Component
function DesktopFilter({ filters, handleFilter }) {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="py-6 border-b border-gray-200"
        >
          {({ open }) => (
            <>
              <h3 className="flow-root -my-3">
                <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="flex items-center ml-6">
                    {open ? (
                      <MinusIcon className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="w-5 h-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, section, option)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}

// For ProductGrid Component
function ProductGrid({ products }) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-0 mx-auto sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id}>
              <div className="relative p-2 border-2 border-gray-200 border-solid group">
                <div className="w-full overflow-hidden bg-gray-200 rounded-md min-h-60 aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </div>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <StarIcon className="inline w-6 h-6"></StarIcon>
                      <span className="align-bottom ">{product.rating}</span>
                    </p>
                  </div>
                  <div>
                    <p className="block text-sm font-medium text-gray-900">
                      $
                      {Math.round(
                        product.price * (1 - product.discountPercentage / 100)
                      )}
                    </p>
                    <p className="block text-sm font-medium text-gray-400 line-through">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// For Pagination Component
function Pagination({ page, setPage, handlePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <div
          onClick={(_) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={(_) => {
            handlePage(page < totalPages ? page + 1 : page);
          }}
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="inline-flex -space-x-px rounded-md shadow-sm isolate"
            aria-label="Pagination"
          >
            <div
              onClick={(_) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                key={index}
                onClick={(_) => handlePage(index + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center cursor-pointer ${
                  index + 1 === page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400"
                } px-4 py-2 text-sm font-semiboldfocus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={(_) => {
                handlePage(page < totalPages ? page + 1 : page);
              }}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
