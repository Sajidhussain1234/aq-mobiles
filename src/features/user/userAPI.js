import axios from "axios";

export async function fetchLoggedInUser(userId) {
  const response = await axios.get(`http://localhost:8080/users/${userId}`);
  const data = response.data;
  return data;
}

export async function fetchLoggedInUserOrders(userId) {
  const response = await axios.get(
    "http://localhost:8080/orders/?user.id=" + userId
  );
  const data = response.data;
  return data;
}

export async function upDateUser(updateUserData) {
  const response = await axios.patch(
    `http://localhost:8080/users/${updateUserData.id}`,
    updateUserData
  );
  const data = response.data;
  // TODO: on server it will only return some info of user (not password)
  return data;
}
