import axios from "axios";

export async function fetchAllProducts() {
  // TODO: we will not hard code server url
  const { data } = await axios.get("http://localhost:8080/products");
  // console.log(data)
  return { data };
}

export async function fetchProductById(id) {
  // TODO: we will not hard code server url
  const { data } = await axios.get(`http://localhost:8080/products/${id}`);
  // console.log(data)
  return { data };
}

export async function fetchProductByFilter(filter, sort, pagination) {
  // filter = {category: ["smartphone","laptop"]}
  // sort = {_sort: "price"_order:"desc",}
  // pagination = {_page:1, _limit=10}
  //TODO: on server we sill support multiple categories
  // console.log(filter)
  // console.log(sort)

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  const response = await axios.get(
    `http://localhost:8080/products?${queryString}`
  );
  const data = response.data;
  const totalItems = await response.headers.get("X-Total-Count"); // when we made api call this gets the total number fo products against that call. In X-Total-Count total number of products are show like here total number of products against this api call 30. X-Total-Count lie under header of api call
  // console.log(data);
  return { data: { products: data, totalItems: totalItems } };
}

export async function fetchCategories() {
  // TODO: we will not hard code server url
  const { data } = await axios.get("http://localhost:8080/categories");
  // console.log(data)
  return { data };
}

export async function fetchBrands() {
  // TODO: we will not hard code server url
  const { data } = await axios.get("http://localhost:8080/brands");
  // console.log(data)
  return { data };
}
