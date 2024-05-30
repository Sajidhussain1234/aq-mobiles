import axios from "axios";

export async function createOrder(newOrder) {
  const response = await axios.post("http://localhost:8080/orders", newOrder);
  return response.data;
}
