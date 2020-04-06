import Axios from "axios";

export const API_URL = "https://outreach.nikhilwadekar.com/api";
export const SOCKET_URL = "https://outreach.nikhilwadekar.com:5000";
export const API_KEY = "xwzHpXGW1i";

/**
 *
 * @param {String} token Bearer Token to Access the Outreach API
 * @param {String} apiRoute The Route to call e.g. /disaster
 * @param {String} type Type of API Call: GET, POST, PUT or DELETE
 * @param {Object} data The data to be sent along the API call
 */
export const apiCall = async (token, apiRoute, type, data) => {
  // Initialize Data Object
  data = data ? data : {};

  // Create the API Function
  const instance = Axios.create({
    baseURL: API_URL,
    headers: { Authorization: "Bearer " + token },
    params: {
      api_key: API_KEY,
    },
  });

  // Call respective function
  switch (type) {
    case "GET":
      // Get API Call
      return await instance.get(apiRoute, data);

    case "POST":
      // Post API Call
      return await instance.post(apiRoute, data);

    case "PUT":
      // Put API Call
      return await instance.put(apiRoute, data);

    case "DELETE":
      // Delete API Call
      return await instance.delete(apiRoute, data);
    default:
      // Invalid API Call
      return null;
  }
};
