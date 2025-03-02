import React, { useState } from "react";
import supabase from "../supabaseClient";  // Use the shared instance

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                console.error("Login error:", error.message);
                setMessage(`Login failed: ${error.message}`);
                return;
            }

            if (!data || !data.session) {
                console.error("Unexpected response:", data);
                setMessage("Unexpected error occurred. Please try again.");
                return;
            }

            console.log("Login successful:", data.session);
            navigate("/dashboard"); // Redirect to Dashboard
        } catch (err) {
            console.error("Unhandled login error:", err);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;

