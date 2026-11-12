
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            <a href="/" className="brand">
            
                <span className="brand-icon">
                    <img src="/JoinlyIcon.png" alt="Joinly Logo" />
                </span>

                <span className="brand-name">
                    Joinly<span className="brand-dot">.</span>
                </span>
            </a>

            <div className="nav-actions">

                <button className="language-btn" type="button">
                    EN <span>⌄</span>
                </button>

                
                <Link to="/login" className="login-btn">
                      Login
                </Link>
                

            </div>

        </nav>
    );
}

export default Navbar;
