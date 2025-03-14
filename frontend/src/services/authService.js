import axios from "axios";
import { jwtDecode } from "jwt-decode";

const authService = {
  initializeAuth: () => {
    delete axios.defaults.headers.common["Authorization"];

    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.removeItem("jwtToken");
          return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return true;
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("jwtToken");
        return false;
      }
    }

    return false;
  },

  isAuthenticated: () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  },

  hasRole: (role) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const userRole = decoded.role || decoded.authorities;

      if (typeof userRole === "string") {
        return userRole === role;
      } else if (Array.isArray(userRole)) {
        return userRole.includes(role);
      } else if (typeof userRole === "string" && userRole.includes(",")) {
        return userRole.split(",").includes(role);
      }

      return false;
    } catch (error) {
      return false;
    }
  },

  hasAnyRole: (roles) => {
    return roles.some((role) => authService.hasRole(role));
  },

  setToken: (token) => {
    localStorage.setItem("jwtToken", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  login: async (email, password) => {
    try {
      const loginCredentials = {
        email,
        password,
      };

      const response = await axios.post("/api/auth/login", loginCredentials);
      const token = response.data;

      authService.setToken(token);

      window.dispatchEvent(new Event("auth-change"));

      return {
        success: true,
        user: authService.getCurrentUser(),
      };
    } catch (error) {
      let errorMessage = "Login failed. Please try again later.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  logout: () => {
    localStorage.removeItem("jwtToken");
    delete axios.defaults.headers.common["Authorization"];
    window.dispatchEvent(new Event("auth-change"));
  },

  getCurrentUser: () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  },
};

export default authService;
