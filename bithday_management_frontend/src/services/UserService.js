import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8080/api/v1/auth/";
const API_BASE_URL = "http://localhost:8080/";

class UserService {
  RegisterUser(user) {
    return axios.post(AUTH_API_BASE_URL + "register", user);
  }
  LoginUser(user) {
    return axios.post(AUTH_API_BASE_URL + "authenticate", user);
  }

  BookEvent(email, token, event) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.post(API_BASE_URL + "user/add-event/" + email, event, config);
  }

  GetThemes(token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.get(API_BASE_URL + "admin/get-all-themes", config);
  }

  GetFoods(token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.get(API_BASE_URL + "admin/get-all-foods", config);
  }

  GetAddons(token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.get(API_BASE_URL + "admin/get-all-addons", config);
  }

  GetEvents(email, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(API_BASE_URL + "user/booked-events/" + email);
    return axios.get(API_BASE_URL + "user/booked-events/" + email, config);
  }

  DeleteEvents(id, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.delete(API_BASE_URL + "user/delete-event/" + id, config);
  }
}

export default new UserService();
