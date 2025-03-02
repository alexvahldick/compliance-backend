import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient"; // ✅ Import the singleton instance

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data.user) {
                console.error("Error fetching user:", error);
                navigate("/"); // Redirect to login if no user session
            } else {
                setUser(data.user);
            }
        };

        getUser();
    }, [navigate]);

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? <p>Welcome, {user.email}!</p> : <p>Loading user info...</p>}

            {/* ✅ Use Link instead of <a href=""> to preserve auth state */}
            <Link to="/form">Go to Form</Link>
            <Link to="/upload">Go to Upload</Link>

            <button
                onClick={async () => {
                    await supabase.auth.signOut();
                    navigate("/"); // Redirect to login page after logout
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
