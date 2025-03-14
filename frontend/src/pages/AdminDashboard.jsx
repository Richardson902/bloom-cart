import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container my-5">
      <h1 className="text-bloom-primary mb-4">Admin Dashboard</h1>

      <div className="row g-4">
        {/* Orders Management */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm border-bloom-secondary">
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <i className="bi bi-box-seam text-bloom-primary display-1"></i>
              </div>
              <h3 className="card-title">Orders</h3>
              <p className="card-text">View and manage customer orders</p>
              <Link to="/admin/orders" className="btn btn-bloom-primary w-100">
                Manage Orders
              </Link>
            </div>
          </div>
        </div>

        {/* Products Management */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm border-bloom-secondary">
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <i className="bi bi-flower1 text-bloom-primary display-1"></i>
              </div>
              <h3 className="card-title">Products</h3>
              <p className="card-text">Add, edit, and manage products</p>
              <div className="d-grid gap-2">
                <Link to="/todo" className="btn btn-bloom-primary">
                  Manage Products
                </Link>
                <Link
                  to="/admin/products/add"
                  className="btn btn-bloom-secondary"
                >
                  Add New Product
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Users Management */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm border-bloom-secondary">
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <i className="bi bi-people text-bloom-primary display-1"></i>
              </div>
              <h3 className="card-title">Users</h3>
              <p className="card-text">Manage user accounts and permissions</p>
              <Link to="/admin/users" className="btn btn-bloom-primary w-100">
                Manage Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
