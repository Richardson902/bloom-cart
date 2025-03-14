import { useState, useEffect } from "react";
import axios from "axios";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const navigate = useNavigate();

  // Available roles in the system
  const availableRoles = ["CUSTOMER", "ADMIN", "AGENT"];

  useEffect(() => {
    authService.initializeAuth();
    fetchUsers();
  }, [navigate]);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("/api/admin/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load users. You may not have permission.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRoleChange = (userId, newRole) => {
    setLoading(true);
    setUpdateSuccess("");
    setError("");

    axios
      .put(`/api/admin/users/${userId}/role`, newRole, {
        headers: {
          "Content-Type": "text/plain", // Since we're sending just the role string
        },
      })
      .then(() => {
        // Update local state to reflect the change
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
        setUpdateSuccess(`User role updated successfully`);
      })
      .catch((err) => {
        console.error("Error updating user role:", err);
        setError("Failed to update user role");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container my-5">
      <div className="card border-bloom-secondary shadow">
        <div className="card-header bg-bloom-primary text-white">
          <h2 className="mb-0">Manage Users</h2>
        </div>
        <div className="card-body bg-bloom-light">
          {error && <div className="alert alert-danger">{error}</div>}
          {updateSuccess && (
            <div className="alert alert-success">{updateSuccess}</div>
          )}

          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Current Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <select
                              className="form-select form-select-sm"
                              value={user.role}
                              onChange={(e) =>
                                handleRoleChange(user.id, e.target.value)
                              }
                            >
                              {availableRoles.map((role) => (
                                <option key={role} value={role}>
                                  {role.replace("ROLE_", "")}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
