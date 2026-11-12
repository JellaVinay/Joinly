
import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero-section">

            <div className="hero-content">

                <div className="hero-label">
                    <span className="status-dot"></span>
                    ONE COMMUNITY. EVERY REGISTRATION COUNTS.
                </div>

                <h1>
                    Hey, <span>Researcher.</span>
                </h1>

                <h2>
                    Curious about your
                    <span> community?</span>
                </h2>

                <p className="hero-description">
                    Do you want to know how many people have
                    joined Joinly? Discover our growing community
                    and find out how many members are from your
                    location.
                </p>

                <p className="hero-subtext">
                    Your journey starts with registration.
                </p>

                <Link to="/register" className="get-started-btn">
                    Get Started
                    <span className="arrow">→</span>
                </Link>

            </div>

            <div className="hero-footer">
                <span className="footer-line"></span>

                <p>
                    A growing community, one registration at a time.
                </p>
            </div>

        </section>
    );
}

export default Hero;
