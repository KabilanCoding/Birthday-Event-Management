import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8080/api/v1/auth/";
const API_BASE_URL = "http://localhost:8080/";
class AdminService {
  LoginAdmin(admin) {
    return axios.post(AUTH_API_BASE_URL + "authenticate", admin);
  }

  PostThemes(email, token, theme) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.post(API_BASE_URL + "admin/add-theme/" + email, theme, config);
  }

  PostAddons(email, token, addons) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.post(
      API_BASE_URL + "admin/add-addons/" + email,
      addons,
      config
    );
  }

  PostFood(email, token, food) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.post(API_BASE_URL + "admin/add-foods/" + email, food, config);
  }

  GetThemes(email, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(API_BASE_URL + "admin/get-themes/" + email);
    return axios.get(API_BASE_URL + "admin/get-themes/" + email, config);
  }

  GetFoods(email, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.get(API_BASE_URL + "admin/get-foods/" + email, config);
  }

  GetAddons(email, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.get(API_BASE_URL + "admin/get-addons/" + email, config);
  }

  UpdateThemes(token, theme) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.put(API_BASE_URL + "admin/update-theme", theme, config);
  }

  UpdateFoods(token, food) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.put(API_BASE_URL + "admin/update-food", food, config);
  }

  UpdateAddons(token, addons) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.put(API_BASE_URL + "admin/update-addon", addons, config);
  }

  GetEvents(token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.get(API_BASE_URL + "get-all-events", config);
  }
}

export default new AdminService();
