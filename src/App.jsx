
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import "./App.css";

// Home Page
function Home() {
    return (
        <main className="landing-page">
            <Navbar />
            <Hero />
        </main>
    );
}

// Temporary Dashboard
function DashboardPlaceholder() {
    return (
        <main className="landing-page">
            <h1>Welcome to Joinly!</h1>
            <p>Your dashboard will be created next.</p>
        </main>
    );
}

// Main App
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default App;
