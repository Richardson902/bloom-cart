import { Link } from "react-router-dom";

function NotImplemented() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-bloom-secondary shadow-sm text-center">
            <div className="card-body py-5">
              <div className="mb-4">
                <i className="bi bi-tools text-bloom-primary display-1"></i>
              </div>

              <h1 className="text-bloom-primary mb-3">Uh Oh!</h1>
              <h3 className="text-muted mb-4">
                This feature is not yet implemented
              </h3>

              <p className="lead mb-4">
                We're working hard to build amazing features for you. Please
                check back soon!
              </p>

              {/* TODO Section */}
              <div className="card bg-bloom-light border-0 mb-4">
                <div className="card-body">
                  <h5 className="card-title text-bloom-primary mb-3">
                    <i className="bi bi-list-check me-2"></i>
                    TODOs for this web application:
                  </h5>
                  <ul className="list-group list-group-flush text-start">
                    <li className="list-group-item bg-transparent d-flex align-items-center">
                      <i className="bi bi-hourglass-split text-warning me-2"></i>
                      Create product management
                    </li>
                  </ul>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <Link to="/" className="btn btn-bloom-primary btn-lg me-2">
                  <i className="bi bi-house-door me-2"></i>
                  Back to Home
                </Link>
                <Link
                  to="/admin/dashboard"
                  className="btn btn-bloom-secondary btn-lg"
                >
                  <i className="bi bi-speedometer2 me-2"></i>
                  Dashboard
                </Link>
              </div>

              <div className="mt-4 text-muted">
                <small>
                  <i className="bi bi-calendar3 me-1"></i>
                  Coming soon!
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotImplemented;
