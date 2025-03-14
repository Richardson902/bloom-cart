import axios from "axios";
import { jwtDecode } from "jwt-decode";

const authService = {
  initializeAuth: () => {
    const token = localStorage.getItem("jtwToken");

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

  logout: () => {
    localStorage.removeItem("jwtToken");
    delete axios.defaults.headers.common["Authorization"];
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
