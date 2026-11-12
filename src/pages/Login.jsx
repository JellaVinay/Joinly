
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    // Handle login submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Save authentication information
            localStorage.setItem("joinlyToken", data.token);
            localStorage.setItem("joinlyUser", JSON.stringify(data.user));

            // Navigate to dashboard
            navigate("/dashboard");

        } catch (error) {
            setError(error.message || "Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-page">

            {/* Login Header */}
            <header className="login-header">

                <span className="brand">
                    <img src="/JoinlyIcon.png" alt="Joinly Logo" className="joinly-icon"/>

                <Link to="/" className="login-brand">
                    Joinly<span>.</span>
                </Link>
                </span>

                <Link to="/" className="back-home">
                    ← Back to Home
                </Link>

               

            </header>

            {/* Login Content */}
            <section className="login-container">

                <div className="login-heading">

                    <span className="login-tag">
                        WELCOME BACK
                    </span>

                    <h1>
                        Welcome <span>back.</span>
                    </h1>

                    <p>
                        Login to your Joinly account and
                        reconnect with your community.
                    </p>

                </div>

                {/* Login Form */}
                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    <div className="login-form-group">
                        <label htmlFor="login-email">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="login-email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="login-password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="login-password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && (
                        <p className="login-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="login-submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login to Joinly"}
                        <span>→</span>
                    </button>

                </form>

                {/* First-time visitor section */}
                <div className="first-time-section">

                    <div className="first-time-divider">
                        <span></span>
                        <p>NEW TO JOINLY?</p>
                        <span></span>
                    </div>

                    <h2>
                        First time here?
                    </h2>

                    <p>
                        Create your account and become part
                        of the Joinly community.
                    </p>

                    <Link
                        to="/register"
                        className="register-redirect-btn"
                    >
                        Register Now
                        <span>→</span>
                    </Link>

                </div>

            </section>

            {/* Footer */}
            <footer className="login-footer">
                <span></span>
                One community. Every registration counts.
            </footer>

        </main>
    );
}

export default Login;
