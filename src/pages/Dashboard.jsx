
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    // Fetch dashboard information from MongoDB through backend
    const fetchDashboardData = async () => {
        const token = localStorage.getItem("joinlyToken");

        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        try {
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/users/dashboard",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("joinlyToken");
                localStorage.removeItem("joinlyUser");
                navigate("/login", { replace: true });
                return;
            }

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to load dashboard"
                );
            }

            setDashboardData(data);

        } catch (error) {
            setError(error.message || "Something went wrong");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Load dashboard when component opens
    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Refresh latest database information
    const handleRefresh = () => {
        setRefreshing(true);
        fetchDashboardData();
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("joinlyToken");
        localStorage.removeItem("joinlyUser");

        navigate("/login", { replace: true });
    };

    if (loading) {
        return (
            <main className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading your Joinly community...</p>
            </main>
        );
    }

    if (error && !dashboardData) {
        return (
            <main className="dashboard-loading">
                <p className="dashboard-error">{error}</p>

                <button onClick={handleRefresh}>
                    Try Again
                </button>
            </main>
        );
    }

    if (!dashboardData) {
        return null;
    }

    const { user, totalUsers, locationCount } = dashboardData;

    return (
        <main className="dashboard-page">

            {/* Dashboard Navbar */}
            <nav className="dashboard-navbar">

                <div className="dashboard-brand">
                    <span className="brand-icon">
                        <img src="/JoinlyIcon.png" alt="Joinly Icon" />
                    </span>

                    Joinly<span>.</span>

                </div>

                <div className="dashboard-nav-right">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <p className="profile-name">{user.name}</p>
                            <p className="profile-location">{user.location}</p>
                        </div>
                    </div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

            </nav>

            {/* Dashboard Main Content */}
            <section className="dashboard-content">

                <div className="dashboard-welcome">

                    <span className="dashboard-tag">
                        YOUR JOINLY SPACE
                    </span>

                    <h1>
                        Welcome, <span>{user.name}</span>
                    </h1>

                    <p>
                        You're part of something bigger.
                        Discover your place in the Joinly community.
                    </p>

                </div>

                {/* Permanent Registration Number */}
                <section className="registration-card">

                    <div className="card-icon">✦</div>

                    <p className="card-label">
                        YOUR JOINLY REGISTRATION NUMBER
                    </p>

                    <h2>
                        {user.registrationNumber}
                        <sup>
                            {user.registrationNumber % 100 >= 11 &&
                                user.registrationNumber % 100 <= 13
                                ? "th"
                                : user.registrationNumber % 10 === 1
                                    ? "st"
                                    : user.registrationNumber % 10 === 2
                                        ? "nd"
                                        : user.registrationNumber % 10 === 3
                                            ? "rd"
                                            : "th"}
                        </sup>
                    </h2>

                    <p className="card-description">
                        You are the {user.registrationNumber}
                        {user.registrationNumber % 100 >= 11 &&
                            user.registrationNumber % 100 <= 13
                            ? "th"
                            : user.registrationNumber % 10 === 1
                                ? "st"
                                : user.registrationNumber % 10 === 2
                                    ? "nd"
                                    : user.registrationNumber % 10 === 3
                                        ? "rd"
                                        : "th"}{" "}
                        person to join the Joinly community.
                        This number is yours permanently.
                    </p>

                </section>

                {/* Community Statistics */}
                <div className="community-heading">
                    <div>
                        <span className="dashboard-tag">
                            COMMUNITY OVERVIEW
                        </span>

                        <h2>Joinly by the numbers.</h2>
                    </div>

                    <button
                        className="refresh-btn"
                        onClick={handleRefresh}
                        disabled={refreshing}
                    >
                        <span className={refreshing ? "refresh-icon spinning" : "refresh-icon"}>
                            ↻
                        </span>

                        {refreshing ? "Refreshing..." : "Refresh"}
                    </button>
                </div>

                {error && (
                    <p className="dashboard-error">{error}</p>
                )}

                <div className="stats-grid">

                    <div className="stat-card total-card">
                        <div className="stat-top">
                            <span className="stat-label">
                                TOTAL MEMBERS
                            </span>
                            <span className="stat-icon">◎</span>
                        </div>

                        <h3>{totalUsers}</h3>

                        <p>
                            People in the Joinly family so far.
                        </p>
                    </div>

                    <div className="stat-card location-card">
                        <div className="stat-top">
                            <span className="stat-label">
                                YOUR LOCATION
                            </span>
                            <span className="stat-icon">⌖</span>
                        </div>

                        <h3>{locationCount}</h3>

                        <p>
                            People from {user.location} have
                            joined this community.
                        </p>
                    </div>

                </div>

                <div className="dashboard-bottom">
                    <span className="bottom-dot"></span>
                    One community. Every registration counts.
                </div>

            </section>

        </main>
    );
}

export default Dashboard;
