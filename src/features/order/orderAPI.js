import axios from "axios";

export async function createOrder(newOrder) {
  const response = await axios.post("http://localhost:8080/orders", newOrder);
  console.log(response);
  return response.data;
}
