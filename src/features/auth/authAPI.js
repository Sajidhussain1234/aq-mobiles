import axios from "axios";

export async function createUser(userData) {
  const response = await axios.post("http://localhost:8080/users", userData);
  const data = response.data;
  // TODO: on server it will only return some info of user (not password)
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

export async function checkUser(loginInfo) {
  const email = loginInfo.email;
  const password = loginInfo.password;
  const response = await axios.get(
    "http://localhost:8080/users?email=" + email
  );
  const data = response.data[0];
  if (Object.keys(data).length) {
    if (password === data.password) {
      return data;
    } else {
      return { message: "wrong credentials" };
    }
  } else {
    return { message: "user not found" };
  }
}
