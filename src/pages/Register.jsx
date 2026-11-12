
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";


function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        location: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Update form values
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    // Submit registration form
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
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
                throw new Error(data.message || "Registration failed");
            }

            // Registration successful: go to login
            navigate("/login", {
                state: {
                    message: "Registration successful! Please login."
                }
            });

        } catch (error) {
            setError(
                error.message || "Unable to connect to the server"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="register-page">

            {/* Registration Header */}
            <header className="register-header">
                <span className="brand">
                <img src="/JoinlyIcon.png" alt="Joinly Logo" height={50}/> 

                <Link to="/" className="register-brand">
                    Joinly<span>.</span>
                </Link>
                </span>
  

                <p>
                    Already a member?
                    <Link to="/login"> Login</Link>
                </p>

            </header>

            {/* Registration Form */}
            <section className="register-container">

                <div className="register-heading">

                    <span className="register-tag">
                        JOIN THE COMMUNITY
                    </span>

                    <h1>
                        Create your <span>account.</span>
                    </h1>

                    <p>
                        Become part of Joinly and discover
                        your growing community.
                    </p>

                </div>

                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">
                        <label htmlFor="name">
                            Full Name
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password (minimum 8 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">
                            Your Location
                        </label>

                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter your city"
                            value={formData.location}
                            onChange={handleChange}
                            autoComplete="address-level2"
                            required
                        />
                    </div>

                    {error && (
                        <p className="register-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="register-submit"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                        <span>→</span>
                    </button>

                    <p className="register-terms">
                        By creating an account, you agree to use
                        Joinly respectfully.
                    </p>

                </form>

            </section>

            <footer className="register-footer">
                <span></span>
                One community. Every registration counts.
            </footer>

        </main>
    );
}

export default Register;
