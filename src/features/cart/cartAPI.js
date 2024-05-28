import axios from "axios";

export async function addToCart(newItem) {
  const response = await axios.post("http://localhost:8080/cart", newItem);
  const data = response.data;
  return data;
}

export async function fetchItemsByUserId(userId) {
  // TODO: we will not hard code server url
  const response = await axios.get(`http://localhost:8080/cart?user=${userId}`);
  const data = response.data;
  return data;
}

export async function updateCart(updateItem) {
  const response = await axios.put(
    `http://localhost:8080/cart/${updateItem.id}`,
    updateItem
  );
  const data = response.data;
  return data;
}

export async function deleteItemFromCart(itemId) {
  const response = await axios.delete(`http://localhost:8080/cart/${itemId}`);
  const data = response.data;
  return data;
}

export async function resetCart(userId) {
  const response = await fetchItemsByUserId(userId);
  const items = response.data;
  for (let item of items) {
    await deleteItemFromCart(item.id);
  }
  return { data: "cart reset" };
}
