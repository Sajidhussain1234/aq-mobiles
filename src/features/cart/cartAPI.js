import axios from 'axios';

export async function addToCart(item) {
  const response = await axios.post("http://localhost:8080/cart", item);
  const data = response.data;
  return data;
}

export async function fetchItemsByUserId(userId) {
  // TODO: we will not hard code server url
  const { data } = await axios.get("http://localhost:8080/cart?user="+userId);
  // console.log(data)
  return { data };
}

export async function updateCart(update) {
  const response = await axios.put("http://localhost:8080/cart"+update.id, update);
  const data = response.data;
  return data
  ;
}
export async function deleteItemFromCart(itemId) {
  const response = await axios.delete("http://localhost:8080/cart"+itemId);
  const data = response.data;
  return data;
}