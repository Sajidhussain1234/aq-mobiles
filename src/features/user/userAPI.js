import axios from "axios";

export async function fetchLoggedInUserOrders(userId) {
  const response = await axios.get(
    "http://localhost:8080/orders/?user.id=" + userId
  );
  const data = response.data;
  return data;
}
