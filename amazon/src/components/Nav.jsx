import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  if (!auth?.isLoggedIn) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Sample
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample07"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {auth.role === "user" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/service">Service</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/todo">Todo</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/contactus">Contact</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/tictactoe">Tic Tac Toe</Link>
                </li>
              </>
            )}

            {auth.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {auth.role === "user" && (
              <button
                className="btn btn-outline-light d-flex align-items-center"
                onClick={() => navigate("/cart")}
              >
                <i className="bi bi-cart me-1"></i>
                Cart
              </button>
            )}

            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;