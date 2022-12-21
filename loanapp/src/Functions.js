import { URL } from "./Constants.js";

export async function getAllUsers() {
  const url = URL + "/UserList";
  const resp = await fetch(url, {
    method: "GET",
    headers: {},
    mode: "cors",
  });
  return resp.json();
}

export async function getAllTransactions() {
  const url = URL + "/AllTransactions";
  const resp = await fetch(url, {
    method: "GET",
    headers: {},
    mode: "cors",
  });
  return resp.json();
}
